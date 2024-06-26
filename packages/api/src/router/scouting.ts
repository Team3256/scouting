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
	getAssignments: publicProcedure
		.input(
			z.object({ event: z.string(), assignee: z.string().uuid().optional() }),
		)
		.query(async ({ ctx, input }) => {
			let query = ctx.supabase
				.from("assignments")
				.select(
					"matches (key, event, events (key, name)), team, alliance, assignee",
				)
				.eq("matches.event", input.event);
			if (input?.assignee === undefined) {
				query = query.is("assignee", null);
			} else {
				query = query.eq("assignee", input.assignee);
			}
			const { data, error } = await query;
			console.log("RPC: getAssignments | input:", input, " | db output:", data);
			if (error !== null || data === null) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Error fetching assignments",
					cause: error,
				});
			}
			// Some data wrangling to make it easier to work with
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

			const byMatch = groupBy(
				data,
				({ matches }) =>
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					matches!.key,
			);
			return Object.values(byMatch).map((matches) => {
				// Keys are guaranteed to be in the form of "frcXXXX" where XXXX is a number
				const redTeams = matches
					.filter((team) => team.alliance.startsWith("red"))
					// biome-ignore lint/style/noNonNullAssertion: see above
					.map((x) => parseInt(x.team.match(/\d+/)![0]));
				const blueTeams = matches
					.filter((team) => team.alliance.startsWith("blue"))
					// biome-ignore lint/style/noNonNullAssertion: see above
					.map((x) => parseInt(x.team.match(/\d+/)![0]));
				return matches.map((x) => {
					return {
						// biome-ignore lint/style/noNonNullAssertion: Matches to a singular match
						matchKey: x.matches!.key,
						// biome-ignore lint/style/noNonNullAssertion: The match should be guaranteed to map to a singular event
						eventKey: x.matches!.event,
						// biome-ignore lint/style/noNonNullAssertion: see above
						eventName: x.matches!.events!.name,
						// biome-ignore lint/style/noNonNullAssertion: see above
						team: parseInt(x.team.match(/\d+/)![0]),
						red: redTeams,
						blue: blueTeams,
						assignee: x.assignee,
					};
				});
			});
			// return byMatch.map(
			// 	({
			// 		matches,
			// 		events,
			// 		team,

			// 		alliance,
			// 	}) => {
			//
			// 		return { team:  };
			// 	},
			// );

			// return ctx.db
			// 	.select()
			// 	.from(matches)
			// 	.where(eq(matches.eventId, input.event))
			// 	.then((matches) => {

			// 	});
		}),

	updateMatchLog: publicProcedure
		.input(
			z.object({
				eventLog,
				matchKey: z.string(),
				team: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { data, error } = await ctx.supabase
				.from("assignments")
				.update({ event_log: input.eventLog })
				.eq("match", input.matchKey)
				.eq("team", input.team)
				.select();
			if (error !== null) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Error updating match log",
					cause: error,
				});
			}
			console.log(
				"RPC: updateMatchLog (db returned data, error, input):",
				data,
				error,
				input,
			);
			// TODO: Actually return somthing for data
			// .where(eq(matches.teamNum, input.teamNum));
		}),
	getMatchLog: publicProcedure
		.input(z.object({ matchKey: z.string(), team: z.string() }))
		.query(async ({ ctx, input }) => {
			const { data: assignments, error } = await ctx.supabase
				.from("assignments")
				.select("event_log")
				.eq("match", input.matchKey)
				.eq("team", input.team);
			if (error !== null) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Error fetching match log",
					cause: error,
				});
			}
			return assignments;
		}),
});
