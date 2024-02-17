"use client";

import { createClient } from "@/lib/utils/supabase/client";
import { SignIn, UserButton } from "@clerk/nextjs";

import { login, signup } from "./actions";

export default function LoginPage() {
  const supabase = createClient();
  return (
    <div className="min-w-md ">
      <SignIn />
      {/* <UserButton /> */}
    </div>
  );
}
