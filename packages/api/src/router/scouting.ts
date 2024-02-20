import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { matches } from "@acme/db/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const UltimateHistory = z.object({
	log: z.array(z.tuple([z.number(), z.number()])),
	checkboxes: z.optional(z.record(z.boolean())),
});

export const eventLog = z.object({
	auto: UltimateHistory,
	teleop: UltimateHistory,
	endgame: UltimateHistory,
});
export const scoutingRouter = createTRPCRouter({
  // createMatch: publicProcedure.input(z.object({id:z.string({})}))
  // updateMatch: publicProcedure.input()
  matchesInEvent: publicProcedure
    .input(z.object({ event: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(matches)
        .where(eq(matches.eventId, input.event));
    }),
  // all: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.post.findMany({
  //     with: { author: true },
  //     orderBy: desc(schema.post.id),
  //     limit: 10,
  //   });
  // }),

  // byId: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(({ ctx, input }) => {
  //     return ctx.db.query.post.findFirst({
  //       with: { author: true },
  //       where: eq(schema.post.id, input.id),
  //     });
  //   }),

	updateMatchLog: publicProcedure
		.input(
			z.object({
				eventLog,
				matchId: z.string(),
				// teamNum: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db
				.update(matches)
				.set({ eventLog: input.eventLog })
				.where(eq(matches.id, input.matchId))
				// .where(eq(matches.teamNum, input.teamNum));
		}),
	getMatchLog: publicProcedure
		.input(z.object({ matchId: z.string() }))
		.query(async ({ ctx, input }) => {
			return ctx.db
				.select()
				.from(matches)
				.where(eq(matches.id, input.matchId))
				.then((matches) => {
					return matches.map((x) => {
						return {
							matchId: x.id,
							eventLog: x.eventLog,
						};
					});
				});
		}),
});
