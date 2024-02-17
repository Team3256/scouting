"use client";
import { createClient } from "@/lib/utils/supabase/client";
import { login, signup } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { UserButton } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

export default function LoginPage() {
  const supabase = createClient();
  return (
    <div className="min-w-md mx-auto">
      <UserButton />
      <SignIn />
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
        }}
        providers={["google"]}
      />
    </div>
  );
  // const router = useRouter();
  // const handleLogin = async () => {
  //   e.preventDefault();

  //   const { user, error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //   });
  //   if (error) {
  //     console.error("Error logging in:", error);
  //     setLoading(false);
  //   } else if (user) {
  //     router.push("/");
  //   }
  // };

  // return (
  //   <>
  //     <button
  //       onClick={handleLogin}
  //       className="rounded bg-white px-4 py-2 text-red-400 hover:bg-gray-100"
  //     >
  //       Log in with Google
  //     </button>
  //     <form>
  //       <label htmlFor="email">Email:</label>
  //       <input id="email" name="email" type="email" required />
  //       <label htmlFor="password">Password:</label>
  //       <input id="password" name="password" type="password" required />
  //       <button formAction={login}>Log in</button>
  //       <button formAction={signup}>Sign up</button>
  //     </form>
  //   </>
  // );
}
