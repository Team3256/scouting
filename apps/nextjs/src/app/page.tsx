"use client";
import Image from "next/image";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </main>
  );
}
