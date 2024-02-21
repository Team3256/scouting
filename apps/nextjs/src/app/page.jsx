"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {supabaseClient} from '../lib/utils/supabase/client';
  
export default function Home() {
const supabase = supabaseClient();

  const fetchData = async () => {
    console.log("IOM HERE")
    // TODO #1: Replace with your JWT template name
    // TODO #2: Replace with your database table name
    
    const { data, error } = await supabase.from('matches').select();
 
    // TODO #3: Handle the response
    console.log("DAAAAA: ", data);
  };
 
  return (
    <main className="min-h-screen">
           <Button asChild>
             <Link href="/login">Login</Link>
           </Button>
           <Button asChild>
             <Link href="/dashboard">Dashboard</Link>
           </Button>
           <Button onClick={fetchData}>Fetch data</Button>
         </main>
  );
}