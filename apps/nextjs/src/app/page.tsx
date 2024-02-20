"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();
export async function signUpPlease() {
  console.log("JJAJDSDSAD");
  supabase.auth.signUp({ email: "amaar2cool@gmail.com", password: "password" });
}

const handleSignUp = async () => {
  console.log("ASNDMANSMDNASM<N");
  await signUpPlease();
  // Perform actions after successful signup
};
export default function Home() {
  return (
    <main className="min-h-screen">
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <Button onClick={handleSignUp}>Testing</Button>
    </main>
  );
}
