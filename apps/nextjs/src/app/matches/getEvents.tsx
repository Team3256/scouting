"use client";

import React, { useEffect } from "react";
import { trpc } from "@/lib/utils/trpc";
import { createTRPCClient } from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@acme/api";

export function allEvents(team: string, y: number) {
  const { data, isLoading } = trpc.tba.teamEvents.useQuery({
    teamKey: team,
    year: y,
  });
  // const teamEvents = await trpc.tba.teamEvents.useQuery({
  //   teamKey,
  //   year,
  // });

  // if (isLoading) return <p>Loading...</p>;
  // console.log("DATA: ", data);
  // return <p>{data}</p>;
  return <p>fjsjfo ijs</p>;
}

// console.log("HAAAAAAA: ", getTeamEvents("frc254", 2023));
// export trpc.withTRPC(allEvents);
