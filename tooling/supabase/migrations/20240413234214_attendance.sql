create table "public"."attendanceKeys" (
    "uid" text not null,
    "name" text,
    "currentlyAttending" boolean not null default false
);


alter table "public"."attendanceKeys" enable row level security;

create table "public"."attendanceSessions" (
    "uid" text not null,
    "startTime" timestamp with time zone not null default now(),
    "endTime" timestamp with time zone
);


alter table "public"."attendanceSessions" enable row level security;

CREATE UNIQUE INDEX "attendanceKeys_pkey" ON public."attendanceKeys" USING btree (uid);

CREATE UNIQUE INDEX "attendanceSessions_pkey" ON public."attendanceSessions" USING btree (uid);

alter table "public"."attendanceKeys" add constraint "attendanceKeys_pkey" PRIMARY KEY using index "attendanceKeys_pkey";

alter table "public"."attendanceSessions" add constraint "attendanceSessions_pkey" PRIMARY KEY using index "attendanceSessions_pkey";

alter table "public"."attendanceSessions" add constraint "public_attendanceSessions_uid_fkey" FOREIGN KEY (uid) REFERENCES "attendanceKeys"(uid) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."attendanceSessions" validate constraint "public_attendanceSessions_uid_fkey";

grant delete on table "public"."assignments" to "PUBLIC";

grant insert on table "public"."assignments" to "PUBLIC";

grant references on table "public"."assignments" to "PUBLIC";

grant select on table "public"."assignments" to "PUBLIC";

grant trigger on table "public"."assignments" to "PUBLIC";

grant truncate on table "public"."assignments" to "PUBLIC";

grant update on table "public"."assignments" to "PUBLIC";

grant delete on table "public"."events" to "PUBLIC";

grant insert on table "public"."events" to "PUBLIC";

grant references on table "public"."events" to "PUBLIC";

grant select on table "public"."events" to "PUBLIC";

grant trigger on table "public"."events" to "PUBLIC";

grant truncate on table "public"."events" to "PUBLIC";

grant update on table "public"."events" to "PUBLIC";

grant delete on table "public"."matches" to "PUBLIC";

grant insert on table "public"."matches" to "PUBLIC";

grant references on table "public"."matches" to "PUBLIC";

grant select on table "public"."matches" to "PUBLIC";

grant trigger on table "public"."matches" to "PUBLIC";

grant truncate on table "public"."matches" to "PUBLIC";

grant update on table "public"."matches" to "PUBLIC";

grant delete on table "public"."profiles" to "PUBLIC";

grant insert on table "public"."profiles" to "PUBLIC";

grant references on table "public"."profiles" to "PUBLIC";

grant select on table "public"."profiles" to "PUBLIC";

grant trigger on table "public"."profiles" to "PUBLIC";

grant truncate on table "public"."profiles" to "PUBLIC";

grant update on table "public"."profiles" to "PUBLIC";


