alter table "public"."assignments" add column "event_log" jsonb not null default '{"auto": {"log": [], "checkboxes": null}, "teleop": {"log": [], "checkboxes": null}, "endgame": {"log": [], "checkboxes": null}}'::jsonb;


