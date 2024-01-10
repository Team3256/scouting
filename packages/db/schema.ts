import { relations, sql } from "drizzle-orm";
import {
  boolean,
  json,
  pgEnum,
  pgTable,
  timestamp,
  //   uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const post = pgTable("post", {
  id: varchar("id", { length: 256 }).primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  content: varchar("content", { length: 256 }).notNull(),
  authorId: varchar("author_id", { length: 256 })
    .notNull()
    .references(() => profile.id),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const postRelations = relations(post, ({ one }) => ({
  author: one(profile, { fields: [post.authorId], references: [profile.id] }),
}));

export const profileRoleEnum = pgEnum("profile_role", [
  "default", // default role
  "lead",
  "mentor",
]);

export const leadRoleEnum = pgEnum("lead_role", [
  "default", // default role. should never be used
  "software",
  "electrical",
  "fabrication",
  "design",
  "vp_engineering",
  "vp_business",
  "president",
]);

export const profile = pgTable("profile", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
  email: varchar("email", { length: 256 }),
  isLead: boolean("is_lead").notNull(),
  isMentor: boolean("is_mentor").notNull(),
  role: profileRoleEnum("role").notNull(),
  lead: leadRoleEnum("lead"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const allianceEnum = pgEnum("alliance", [
  "default", // shouldn't ever be used
  "red",
  "blue",
]);

export const intakeEnum = pgEnum("intake", [
  "default", // shouldn't be used
  "none",
  "ground",
  "source",
  "both",
]);

export const robotRoleEnum = pgEnum("robot_role", [
  "default",
  "defensive",
  "offensive"
]);

export const quantitativeScouting = pgTable("quantitative_scouting", {
  id: varchar("id", { length: 256 }).primaryKey(),
  userId: varchar("user_id", {
    length: 256
  })
    .notNull()
    .references(() => profile.id),
  alliance: allianceEnum("alliance").notNull(), // team and match information
  teamNum: varchar("team_num", { length: 256 }).notNull(),
  matchNum: varchar("match_num", { length: 256 }).notNull(),
  numScoredAuto: varchar("num_scored_auto", { length: 256 }).notNull(), // auto information
  didIntakeAuto: boolean("did_intake_auto").notNull(),
  didLeave: boolean("did_leave").notNull(),
  numIntakes: varchar("num_intakes", { length: 256 }).notNull(), // teleop info
  numOuttakes: varchar("num_outtakes", { length: 256 }).notNull(),
  numMissedOuttakes: varchar("num_missed_outtakes", { length: 256 }).notNull(),
  cycleTime: varchar("cycle_time", { length: 256 }).notNull(),
  intakeLocations: intakeEnum("intake_location").notNull(),
  outtakeLocations: varchar("outtake_location").notNull(),
  rankingPoints: varchar("ranking_points", { length: 256 }).notNull(),
  didDC: boolean("did_dc").notNull(),
  DCTime: varchar("dc_time", { length: 256 }), // optional (enabled on form if didDC == true)
  didTip: boolean("did_tip").notNull(),
  tipTime: varchar("tip_time"), // optional (enabled if didTip == true
  createdAt: timestamp("created_at")
    .default(sql `CURRENT_TIMESTAMP`)
    .notNull(),
});

export const pitScouting = pgTable("pit_scouting", {
  id: varchar("id", { length: 256 }).primaryKey(),
  userId: varchar("user_id", {
    length: 256
  })
    .references(() => profile.id)
    .notNull(),
  teamNum: varchar("team_num", { length: 256 }).notNull(),
  length: varchar("length", { length: 256 }).notNull(), // length, width, and height
  width: varchar("width", { length: 256 }).notNull(),
  height: varchar("height", { length: 256 }).notNull(),
  lengthWExt: varchar("length_w_ext", { length: 256 }).notNull(),
  widthWExt: varchar("width_w_ext", { length: 256 }).notNull(),
  heightWExt: varchar("height_w_ext", { length: 256 }).notNull(),
  robotWeight: varchar("robot_weight", { length: 256 }).notNull(),
  outtakePrefrence: varchar("outtake_prefrence", { length: 256 }), // should be a multiple answer on form
  avgCycleTime: varchar("avg_cycle_time", { length: 256 }).notNull(),
  avgNumCycles: varchar("avg_num_cycles", { length: 256 }).notNull(),
  hasDC: boolean("has_dc").notNull(),
  hasTipped: boolean("has_tipped").notNull(),
  image: varchar("image", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const qualitativeScouting = pgTable("qualitative_scouting", {
  id: varchar("id", { length: 256 }).primaryKey(),
  userId: varchar("user_id", {
    length: 256
  })
    .references(() => profile.id)
    .notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  teamNum: varchar("team_num", { length: 256 }).notNull(),
  alliance: allianceEnum("alliance").notNull(),
  matchNum: varchar("match_num", { length: 256 }).notNull(),
  eventNum: varchar("event_num", { length: 256 }).notNull(),
  robotRole: robotRoleEnum("robot_role").notNull(),
  fieldAwareness: varchar("field_awareness", { length: 256 }).notNull(),
  driverAwareness: varchar("driver_awareness", { length: 256 }).notNull(),
  driverAbility: varchar("driver_ability", { length: 256 }).notNull(),
});
export const profileRelations = relations(profile, ({ many }) => ({
  posts: many(post),
}));

// Attendance schema

export const location = pgTable("location", {
  id: varchar("id", {
    length: 256,
  }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  latitude: varchar("latitude", { length: 256 }).notNull(),
  longitude: varchar("longitude", { length: 256 }).notNull(),
  radius: varchar("radius", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  isActive: boolean("is_active").notNull(),
  isSchool: boolean("is_school").notNull(), // basically a "primary" location. default location when we're not at regionals, etc.
  author_id: varchar("author_id", { length: 256 }),
});

export const locationRelations = relations(location, ({ many, one }) => ({
  meetings: many(meeting),
  creator: one(profile, {
    fields: [location.author_id],
    references: [profile.id],
  }), // the person who created the location. not shown in the UI, but useful for debugging + analytics + etc.
}));

export const meeting = pgTable("meeting", {
  id: varchar("id", {
    length: 256,
  }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  date: timestamp("date").notNull(),
  isLocationAtSchool: boolean("is_location_at_school").notNull(),
  isCancelled: boolean("is_cancelled").notNull(),
  attendanceCode: varchar("attendance_code", { length: 256 }).notNull(),
  attendanceCodeExpiresAt: timestamp("attendance_code_expires_at").notNull(),
  locationId: varchar("location_id", {
    length: 256,
  })
    .notNull()
    .references(() => location.id),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const meetingRelations = relations(meeting, ({ many, one }) => ({
  attendances: many(attendance),
  location: one(location, {
    fields: [meeting.locationId],
    references: [location.id],
  }),
}));

export const attendance = pgTable("attendance", {
  id: varchar("id", {
    length: 256,
  }).primaryKey(),
  meetingId: varchar("meeting_id", {
    length: 256,
  })
    .notNull()
    .references(() => meeting.id),
  studentId: varchar("student_id", {
    length: 256,
  })
    .notNull()
    .references(() => profile.id),
  isPresent: boolean("is_present").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  location: json("location").notNull(), // this "location" is the location of the student when they checked in. it's not the location of the meeting. we store this as a JSON object because we're rarely going to query it, and it's easier to store it as a JSON object than to create a whole new table for it.
});

export const attendanceRelations = relations(attendance, ({ one }) => ({
  meeting: one(meeting, {
    fields: [attendance.meetingId],
    references: [meeting.id],
  }),
  student: one(profile, {
    fields: [attendance.studentId],
    references: [profile.id],
  }),
})); // This allows us to query an attendance record and get the meeting and student associated with it quickly

// End attendance schema
