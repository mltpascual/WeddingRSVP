import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  createRsvp: vi.fn().mockResolvedValue(undefined),
  getAllRsvps: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      attending: "yes",
      message: "Can't wait!",
      createdAt: new Date("2026-01-01"),
      updatedAt: new Date("2026-01-01"),
    },
    {
      id: 2,
      name: "Jane Smith",
      email: null,
      attending: "no",
      message: null,
      createdAt: new Date("2026-01-02"),
      updatedAt: new Date("2026-01-02"),
    },
  ]),
  getRsvpStats: vi.fn().mockResolvedValue({
    total: 2,
    attending: 1,
    declining: 1,
  }),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("rsvp.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts a valid RSVP submission (attending yes)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.rsvp.submit({
      name: "John Doe",
      email: "john@example.com",
      attending: "yes",
      message: "Can't wait to celebrate!",
    });

    expect(result).toEqual({ success: true });
  });

  it("accepts a valid RSVP submission (attending no)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.rsvp.submit({
      name: "Jane Smith",
      attending: "no",
    });

    expect(result).toEqual({ success: true });
  });

  it("accepts RSVP with empty optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.rsvp.submit({
      name: "Test Guest",
      email: "",
      attending: "yes",
      message: "",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects RSVP with empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.rsvp.submit({
        name: "",
        attending: "yes",
      })
    ).rejects.toThrow();
  });

  it("rejects RSVP with invalid attending value", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.rsvp.submit({
        name: "Test",
        attending: "maybe" as any,
      })
    ).rejects.toThrow();
  });

  it("does not require authentication to submit", async () => {
    const ctx = createPublicContext(); // no user
    const caller = appRouter.createCaller(ctx);

    const result = await caller.rsvp.submit({
      name: "Anonymous Guest",
      attending: "yes",
    });

    expect(result).toEqual({ success: true });
  });
});

describe("rsvp.list", () => {
  it("returns all RSVPs for admin users", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.rsvp.list();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("John Doe");
    expect(result[1].name).toBe("Jane Smith");
  });

  it("rejects non-admin users", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.rsvp.list()).rejects.toThrow();
  });

  it("rejects unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.rsvp.list()).rejects.toThrow();
  });
});

describe("rsvp.stats", () => {
  it("returns RSVP statistics for admin users", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.rsvp.stats();

    expect(result).toEqual({
      total: 2,
      attending: 1,
      declining: 1,
    });
  });

  it("rejects non-admin users", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.rsvp.stats()).rejects.toThrow();
  });
});
