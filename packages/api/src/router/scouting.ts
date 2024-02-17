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

export const godlyLog = z.object({
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
        godlyLog,
        matchId: z.string(),
        teamNum: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(matches)
        .set({ eventLog: input.godlyLog })
        .where(eq(matches.id, input.matchId))
        .where(eq(matches.teamNum, input.teamNum));
    }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.post.findMany({
      with: { author: true },
      orderBy: desc(schema.post.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.post.findFirst({
        with: { author: true },
        where: eq(schema.post.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      function getNameFromUser() {
        const meta = ctx.user.user_metadata;
        if (typeof meta.name === "string") return meta.name;
        if (typeof meta.full_name === "string") return meta.full_name;
        if (typeof meta.user_name === "string") return meta.user_name;
        return "[redacted]";
      }

      const authorId = await ctx.db.query.profile
        .findFirst({
          where: eq(schema.profile.id, ctx.user.id),
        })
        .then(async (profile) => {
          if (profile) return profile.id;
          const [newProfile] = await ctx.db
            .insert(schema.profile)
            .values({
              id: ctx.user.id,
              name: getNameFromUser(),
              image: ctx.user.user_metadata.avatar_url as string | undefined,
              email: ctx.user.email,
              isLead: false,
              isMentor: false,
              role: "default",
            })
            .returning();

          return newProfile!.id;
        });

      return ctx.db.insert(schema.post).values({
        id: nanoid(),
        authorId,
        title: input.title,
        content: input.content,
      });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.query.post.findFirst({
        where: eq(schema.post.id, input),
      });

      if (post?.authorId !== ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Only the author is allowed to delete the post",
        });
      }

      return ctx.db.delete(schema.post).where(eq(schema.post.id, input));
    }),
});
