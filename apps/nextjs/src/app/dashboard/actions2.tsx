"use client";

import React from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { add } from "date-fns";

import { Button } from "../../components/ui/button";
import { createClient } from "../../lib/utils/supabase/client";

// export default async function InteractiveButton() {
//   return <Button onClick={() => addMatch}>Testinggssgg</Button>;
// }
export default async function InteractiveButton() {
  console.log("I HAVE BEEN CALLED");
  addMatch();
  return () => addMatch;
}

async function addMatch() {
  // (formData: FormData) {
  console.log("JKL JLKJDSJFKLJK");
  const supabase = createClient();
  const { data, error } = await supabase
    .from("matches")
    .insert([
      {
        id: "42069", // formData.get("id") as string,
        match_num: "oskg", // formData.get("match_num") as string,
        team_num: "1234222", // formData.get("team_num") as string,
        alliance: "blue", // formData.get("alliance") as string,
        event_id: "test", // formData.get("event_id") as string,
        auth_id: "ad2334c7-fd25-464e-a4de-d147bc37eeeb", // formData.get("auth_id") as string,
      },
    ])
    .select();
  console.log("error", error);
}
