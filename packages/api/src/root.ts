import { attendanceRouter } from "./router/attendance";
import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { scoutingRouter } from "./router/scouting";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  attendance: attendanceRouter,
  scouting: scoutingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
