import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";
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
				.where(eq(matches.eventId, input.event))
				.then((matches) => {
					const groupBy = <T>(
						array: T[],
						predicate: (value: T, index: number, array: T[]) => string,
					) =>
						array.reduce(
							(acc, value, index, array) => {
								(acc[predicate(value, index, array)] ||= []).push(value);
								return acc;
							},
							{} as Record<string, T[]>,
						);
					const byMatch = groupBy(matches, (match) => match.matchNum);

					return Object.values(byMatch).map((matches) => {
						const redTeams = matches
							.filter((team) => team.alliance.startsWith("red"))
							.map((x) => parseInt(x.teamNum));
						const blueTeams = matches
							.filter((team) => team.alliance.startsWith("blue"))
							.map((x) => parseInt(x.teamNum));
						return matches.map((x) => {
							return {
								matchId: x.id,
								matchNum: x.matchNum,
								eventId: x.eventId,
								team: parseInt(x.teamNum),
								red: redTeams,
								blue: blueTeams,
							};
						});
					});
				});
		}),

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