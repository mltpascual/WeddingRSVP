import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createRsvp, getAllRsvps, getRsvpStats } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  rsvp: router({
    /** Submit an RSVP — public, no auth required */
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required").max(255),
          email: z.string().email().max(320).optional().or(z.literal("")),
          attending: z.enum(["yes", "no"]),
          message: z.string().max(1000).optional().or(z.literal("")),
        })
      )
      .mutation(async ({ input }) => {
        await createRsvp({
          name: input.name,
          email: input.email || null,
          attending: input.attending,
          message: input.message || null,
        });
        return { success: true };
      }),

    /** List all RSVPs — admin only */
    list: adminProcedure.query(async () => {
      return getAllRsvps();
    }),

    /** Get RSVP stats — admin only */
    stats: adminProcedure.query(async () => {
      return getRsvpStats();
    }),
  }),
});

export type AppRouter = typeof appRouter;
