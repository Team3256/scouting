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
