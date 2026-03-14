import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getDb } from "./firebase";

/** Firestore collection name */
const RSVP_COLLECTION = "rsvps";

/** Shape of an RSVP document stored in Firestore */
export type RsvpDoc = {
  id: string;
  name: string;
  email: string | null;
  attending: "yes" | "no";
  message: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/** Input for creating a new RSVP */
export type RsvpInput = {
  name: string;
  email: string;
  attending: "yes" | "no";
  message: string;
};

/** Input for updating an existing RSVP */
export type RsvpUpdateInput = {
  id: string;
  name: string;
  email: string | null;
  attending: "yes" | "no";
  message: string | null;
};

/** Stats shape */
export type RsvpStats = {
  total: number;
  attending: number;
  declining: number;
  withMessages: number;
};

/**
 * Submit a new RSVP to Firestore.
 */
export async function submitRsvp(input: RsvpInput): Promise<string> {
  const db = getDb();
  const docRef = await addDoc(collection(db, RSVP_COLLECTION), {
    name: input.name,
    email: input.email || null,
    attending: input.attending,
    message: input.message || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Fetch all RSVPs, ordered by creation date (newest first).
 */
export async function listRsvps(): Promise<RsvpDoc[]> {
  const db = getDb();
  const q = query(collection(db, RSVP_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name ?? "",
      email: data.email ?? null,
      attending: data.attending ?? "yes",
      message: data.message ?? null,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
      updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(),
    };
  });
}

/**
 * Get RSVP statistics.
 */
export async function getRsvpStats(): Promise<RsvpStats> {
  const rsvps = await listRsvps();
  return {
    total: rsvps.length,
    attending: rsvps.filter((r) => r.attending === "yes").length,
    declining: rsvps.filter((r) => r.attending === "no").length,
    withMessages: rsvps.filter((r) => r.message && r.message.trim().length > 0).length,
  };
}

/**
 * Update an existing RSVP document.
 */
export async function updateRsvp(input: RsvpUpdateInput): Promise<void> {
  const db = getDb();
  const docRef = doc(db, RSVP_COLLECTION, input.id);
  await updateDoc(docRef, {
    name: input.name,
    email: input.email,
    attending: input.attending,
    message: input.message,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete an RSVP document.
 */
export async function deleteRsvp(id: string): Promise<void> {
  const db = getDb();
  const docRef = doc(db, RSVP_COLLECTION, id);
  await deleteDoc(docRef);
}
