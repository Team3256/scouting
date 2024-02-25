import React from "react";
import { createTRPCClient } from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@acme/api";

const api = createTRPCReact<AppRouter>();

export default async function getTeamEvents(teamKey: string, year: number) {
  const teamEvents = await api.tba.teamEvents.useQuery({
    teamKey,
    year,
  });
  console.log(teamEvents);
  return teamEvents;
}

console.log("HAAAAAAA: ", getTeamEvents("frc254", 2023));
