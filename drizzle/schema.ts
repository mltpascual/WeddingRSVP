import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * RSVP responses table.
 * Stores each guest's RSVP for the wedding.
 * Policy: 1-to-1 invitation — each RSVP is for one person only.
 */
export const rsvps = mysqlTable("rsvps", {
  id: int("id").autoincrement().primaryKey(),
  /** Guest's full name */
  name: varchar("name", { length: 255 }).notNull(),
  /** Guest's email (optional) */
  email: varchar("email", { length: 320 }),
  /** Whether the guest is attending: 'yes' or 'no' */
  attending: mysqlEnum("attending", ["yes", "no"]).notNull(),
  /** Optional message for the couple */
  message: text("message"),
  /** Timestamp when the RSVP was submitted */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** Timestamp when the RSVP was last updated */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Rsvp = typeof rsvps.$inferSelect;
export type InsertRsvp = typeof rsvps.$inferInsert;