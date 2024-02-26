import { createClient } from "@/lib/utils/supabase/client";

export async function addToDatabase() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("assignments")
    .insert([
      {
        match: "2023cacg_qm13",
        team: "325666",
        alliance: "blue1",
        assignee: null,
        event_log: {
          auto: { log: [], checkboxes: null },
          teleop: { log: [], checkboxes: null },
          endgame: { log: [], checkboxes: null },
        },
      },
    ])
    .select();

  if (error) {
    console.error("Error: ", error);
  } else {
    console.log("Data: ", data);
  }
}
