import React from "react";
import { trpc } from "@/lib/utils/trpc";
import { createTRPCClient } from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@acme/api";

export default async function getTeamEvents(teamKey: string, year: number) {
  // const teamEvents = await trpc.tba.teamEvents.useQuery({
  //   teamKey,
  //   year,
  // });
  const teamEvents = await trpc.tba.teamEvents.useQuery({ teamKey, year });
  console.log(teamEvents);
  return teamEvents;
}

console.log("HAAAAAAA: ", getTeamEvents("frc254", 2023));
