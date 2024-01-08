import type { User } from "@supabase/supabase-js";

// import { db, eq, schema } from "@acme/db";

export function getNameFromUser(user: User) {
  const meta = user.user_metadata;
  if (typeof meta.name === "string") return meta.name;
  if (typeof meta.full_name === "string") return meta.full_name;
  if (typeof meta.user_name === "string") return meta.user_name;
  if (typeof user.email === "string") return user.email;
  return "[unknown-err(0x20)]"; // 0x20 Unable to determine name from user via user metadata.
}

// export async function createOrGetUserProfileId(user: User): Promise<string> {
//   return db.query.profile
//     .findFirst({
//       where: eq(schema.profile.id, user.id),
//     })
//     .then(async (profile) => {
//       if (profile) return profile.id;
//       const [newProfile] = await ctx.db
//         .insert(schema.profile)
//         .values({
//           id: ctx.user.id,
//           name: getNameFromUser(ctx.user),
//           image: ctx.user.user_metadata.avatar_url as string | undefined,
//           email: ctx.user.email,
//           isLead: false,
//           isMentor: false,
//           role: "default", // ideally we should have a constants file for this and then dynamically generate the isLead/isMentor/role/lead fields
//         })
//         .returning();

//       return newProfile!.id;
//     });
// }
