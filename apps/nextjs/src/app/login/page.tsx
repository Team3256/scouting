"use client";

import { supabaseClient } from "@/lib/utils/supabase/client";

import { login, signup } from "./actions";

export default function LoginPage() {
  const supabase = supabaseClient();
  return <div className="min-w-md ">{/* <SignIn /> */}</div>;
}
