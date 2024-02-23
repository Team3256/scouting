import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { locationRelations } from "@acme/db/schema";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { inLocation } from "../utils/location";
import { getNameFromUser } from "../utils/user";

// TODO: Fix this!!!!!
// export const createOrGetUserProfileId = async (user: User): string => {
//   const authorId = await db.query.profile
//     .findFirst({
//       where: eq(schema.profile.id, user.id),
//     })
//     .then(async (profile) => {
//       if (profile) return profile.id;
//       const [newProfile] = await ctx.db
//         .insert(schema.profile)
//         .values({
//           id: user.id,
//           name: getNameFromUser(user),
//           image: user.user_metadata.avatar_url as string | undefined,
//           email: user.email,
//           isLead: false,
//           isMentor: false,
//           role: "default", // ideally we should have a constants file for this and then dynamically generate the isLead/isMentor/role/lead fields
//         })
//         .returning();

//       return newProfile!.id;
//     });

//   return authorId;
// };

export const attendanceRouter = createTRPCRouter({
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

  // create: protectedProcedure
  //   .input(
  //     z.object({
  //       title: z.string().min(1),
  //       content: z.string().min(1),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const authorId = await ctx.db.query.profile
  //       .findFirst({
  //         where: eq(schema.profile.id, ctx.user.id),
  //       })
  //       .then(async (profile) => {
  //         if (profile) return profile.id;
  //         const [newProfile] = await ctx.db
  //           .insert(schema.profile)
  //           .values({
  //             id: ctx.user.id,
  //             name: getNameFromUser(ctx.user),
  //             image: ctx.user.user_metadata.avatar_url as string | undefined,
  //             email: ctx.user.email,
  //             isLead: false,
  //             isMentor: false,
  //             role: "default", // ideally we should have a constants file for this and then dynamically generate the isLead/isMentor/role/lead fields
  //           })
  //           .returning();

  //         return newProfile!.id;
  //       });

  //     return ctx.db.insert(schema.post).values({
  //       id: nanoid(),
  //       authorId,
  //       title: input.title,
  //       content: input.content,
  //     });
  //   }),

  // delete: protectedProcedure
  //   .input(z.string())
  //   .mutation(async ({ ctx, input }) => {
  //     const post = await ctx.db.query.post.findFirst({
  //       where: eq(schema.post.id, input),
  //     });

  //     if (post?.authorId !== ctx.user.id) {
  //       throw new TRPCError({
  //         code: "UNAUTHORIZED",
  //         message: "Only the author is allowed to delete the post",
  //       });
  //     }

  //     return ctx.db.delete(schema.post).where(eq(schema.post.id, input));
  //   }),

  // createLocation: protectedProcedure
  //   .input(
  //     z.object({
  //       name: z.string().min(1),
  //       isSchool: z.boolean(),
  //       latitude: z.string(),
  //       longitude: z.string(),
  //       isActive: z.boolean(),
  //       radius: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const authorId = await ctx.db.query.profile
  //       .findFirst({
  //         where: eq(schema.profile.id, ctx.user.id),
  //       })
  //       .then(async (profile) => {
  //         if (profile) return profile.id;
  //         const [newProfile] = await ctx.db
  //           .insert(schema.profile)
  //           .values({
  //             id: ctx.user.id,
  //             name: getNameFromUser(ctx.user),
  //             image: ctx.user.user_metadata.avatar_url as string | undefined,
  //             email: ctx.user.email,
  //             isLead: false,
  //             isMentor: false,
  //             role: "default", // ideally we should have a constants file for this and then dynamically generate the isLead/isMentor/role/lead fields
  //           })
  //           .returning();

  //         return newProfile!.id;
  //       });

  //     return ctx.db.insert(schema.location).values({
  //       id: nanoid(),
  //       name: input.name,
  //       isSchool: input.isSchool,
  //       latitude: input.latitude,
  //       longitude: input.longitude,
  //       isActive: input.isActive,
  //       radius: input.radius,
  //       author_id: authorId,
  //     });
  //   }),

  getLocations: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.location.findMany({
      // with: {
      //   creator: false
      // }
      orderBy: desc(schema.location.id),
      limit: 10,
    });
  }),

  // deleting a location requires admin privileges (i.e no one will ever do it so we don't need to implement it)

  createMeeting: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        date: z.string().min(1).optional(),
        isLocationAtSchool: z.boolean().optional().default(false),
        isCancelled: z.boolean().optional().default(false),
        locationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // const authorId = await ctx.db.query.profile
      //   .findFirst({
      //     where: eq(schema.profile.id, ctx.user.id),
      //   })
      //   .then(async (profile) => {
      //     if (profile) return profile.id;
      //     const [newProfile] = await ctx.db
      //       .insert(schema.profile)
      //       .values({
      //         id: ctx.user.id,
      //         name: getNameFromUser(ctx.user),
      //         image: ctx.user.user_metadata.avatar_url as string | undefined,
      //         email: ctx.user.email,
      //         isLead: false,
      //         isMentor: false,
      //         role: "default", // ideally we should have a constants file for this and then dynamically generate the isLead/isMentor/role/lead fields
      //       })
      //       .returning();

      //     return newProfile!.id;
      //   });

      return ctx.db.insert(schema.meeting).values({
        id: nanoid(),
        name:
          input.name ??
          "Meeting for " + (input.date ?? new Date().toDateString()),
        date: input.date ? new Date(input.date) : new Date(),
        isLocationAtSchool: input.isLocationAtSchool,
        isCancelled: input.isCancelled,
        attendanceCode: "000000", // six digit code
        attendanceCodeExpiresAt: new Date(Date.now() + 15 * 60000), // 15 minutes from now
        locationId: input.locationId,
      });
    }),

  modifyMeeting: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        date: z.string().min(1).optional(),
        isLocationAtSchool: z.boolean().optional().default(false),
        isCancelled: z.boolean().optional().default(false),
        locationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.meeting)
        .set({
          name: input.name,
          date: new Date(input.date ?? new Date().toISOString()),
          isLocationAtSchool: input.isLocationAtSchool,
          isCancelled: input.isCancelled,
          locationId: input.locationId,
        })
        .where(eq(schema.meeting.id, input.id));
    }),

  getMeetings: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.meeting.findMany({
      orderBy: desc(schema.meeting.id),
      limit: 2000,
    });
  }),

  getMeetingsByLocationId: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.query.meeting.findMany({
        where: eq(schema.meeting.locationId, input),
        orderBy: desc(schema.meeting.id),
        limit: 2000,
      });
    }),

  // checkIntoMeeting: protectedProcedure
  //   .input(
  //     z.object({
  //       meetingId: z.string(),
  //       location: z.object({
  //         latitude: z.string(),
  //         longitude: z.string(),
  //       }),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const authorId = await ctx.db.query.profile
  //       .findFirst({
  //         where: eq(schema.profile.id, ctx.user.id),
  //       })
  //       .then(async (profile) => {
  //         if (profile) return profile.id;
  //         const [newProfile] = await ctx.db
  //           .insert(schema.profile)
  //           .values({
  //             id: ctx.user.id,
  //             name: getNameFromUser(ctx.user),
  //             image: ctx.user.user_metadata.avatar_url as string | undefined,
  //             email: ctx.user.email,
  //             isLead: false,
  //             isMentor: false,
  //             role: "default", // ideally we should have a constants file for this and then dynamically generate the isLead/isMentor/role/lead fields
  //           })
  //           .returning();

  //         return newProfile!.id;
  //       });

  //     // Get the meeting from MeetingID
  //     // Check if the meeting is cancelled and where it is
  //     // Check if the user is in the location
  //     // Check if the user has already checked in
  //     // If the user has already checked in, return an error
  //     // If the user has not checked in, check them in
  //     // Return success

  //     console.log(
  //       ctx.user.email +
  //         " wants to check into meeting " +
  //         input.meetingId +
  //         " at location " +
  //         JSON.stringify(input.location),
  //     );

  //     const meeting = await ctx.db.query.meeting.findFirst({
  //       where: eq(schema.meeting.id, input.meetingId),
  //     });
  //     if (!meeting) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Meeting not found",
  //       });
  //     }
  //     if (meeting.isCancelled) {
  //       throw new TRPCError({
  //         code: "PRECONDITION_FAILED",
  //         message: "Meeting is cancelled",
  //       });
  //     }
  //     const location = await ctx.db.query.location.findFirst({
  //       where: eq(schema.location.id, meeting.locationId),
  //     });

  //     if (!location) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message:
  //           "Location not found for meeting " +
  //           meeting.id +
  //           "! Call a developer, this should never happen!",
  //       });
  //     }

  //     // Check that we're in the location radius - we have a radius set per location
  //     // If we're not in the location radius, throw an error
  //     // If we are in the location radius, continue

  //     if (
  //       inLocation(
  //         input.location.latitude,
  //         input.location.longitude,
  //         location.latitude,
  //         location.longitude,
  //         String(location.radius),
  //       )
  //     ) {
  //       throw new TRPCError({
  //         code: "PRECONDITION_FAILED",
  //         message: "You are not in the location radius",
  //       });
  //     }

  //     // Check if the user has already checked in
  //     // If the user has already checked in, return an error
  //     // If the user has not checked in, check them in
  //     // Return success

  //     const attendance = await ctx.db.query.attendance.findMany({
  //       where: eq(schema.attendance.meetingId, meeting.id),
  //     });

  //     // Search for an attendance record with the meeting ID and the user ID
  //     // If there is an attendance record, return an error
  //     // If there is no attendance record, create one and return success

  //     if (!attendance) {
  //       // First person to check in! Create an attendance record
  //       return ctx.db.insert(schema.attendance).values({
  //         id: nanoid(),
  //         studentId: authorId,
  //         meetingId: meeting.id,
  //         isPresent: true,
  //         location: JSON.stringify(input.location),
  //       });
  //     }
  //     for (const attendanceRecord of attendance) {
  //       if (attendanceRecord.studentId === authorId) {
  //         throw new TRPCError({
  //           code: "PRECONDITION_FAILED",
  //           message: "You have already checked in",
  //         });
  //       }
  //     }
  //     // No attendance record found for this user and meeting, create one
  //     return ctx.db.insert(schema.attendance).values({
  //       id: nanoid(),
  //       studentId: authorId,
  //       meetingId: meeting.id,
  //       isPresent: true,
  //       location: JSON.stringify(input.location),
  //     });
  //   }),

  checkIntoMeetingWithCode: protectedProcedure
    .input(
      z.object({
        meetingId: z.string(),
        code: z.string(),
        location: z.object({
          latitude: z.string(),
          longitude: z.string(),
        }),
      }),
    )
    .mutation(({ ctx, input }) => {
      console.log(
        `${ctx.user.email}wanted to check into meeting ${input.meetingId} with code ${input.code}`,
      );
    }),
});
