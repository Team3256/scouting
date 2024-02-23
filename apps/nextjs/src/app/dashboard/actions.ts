"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/utils/supabase/server";


async function addMatch(formData: FormData) {
  const supabase = createClient();
const { data, error } = await supabase
.from('matches')
.insert([
  { id: 'testtttt', match_num: 'oskg' ,team_num: '1234', alliance: 'blue',event_id: 'test', auth_id: 'ad2334c7-fd25-464e-a4de-d147bc37eeeb'},
])
.select()
console.log("error", error);
  if (error) {
    // TODO: Form check error
    redirect("/error");
  }   

}

