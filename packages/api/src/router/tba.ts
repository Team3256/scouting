import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import axios from "axios";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const tbaRouter = createTRPCRouter({
  teamEvents: publicProcedure
    .input(z.object({ teamKey: z.string(), year: z.number() }))
    .query(async ({ input }) => {
      const response = await axios.get(
        `https://www.thebluealliance.com/api/v3/team/${input.teamKey}/events/${input.year}`,
        {
          headers: {
            "X-TBA-Auth-Key":
              "5CnvqgQnVEtePAqwFls3PnlxxKFW88o67RAP6zPlZXGtWV6B6Mx7mSkBlfonEp4c",
          },
        },
      );

      const extractedData = (
        response.data as { event_code: string; key: string }[]
      ).map((event: { event_code: string; key: string }) => ({
        event_code: event.event_code,
        key: event.key,
      }));

      return extractedData as { event_code: string; key: string }[];
    }),
  eventMatches: publicProcedure
    .input(z.object({ teamKey: z.string() }))
    .query(async ({ input }) => {
      const response = await axios.get(
        `https://www.thebluealliance.com/api/v3/event/${input}/matches`,
        {
          headers: {
            "X-TBA-Auth-Key":
              "5CnvqgQnVEtePAqwFls3PnlxxKFW88o67RAP6zPlZXGtWV6B6Mx7mSkBlfonEp4c",
          },
        },
      );
      const extractedData2 = (
        response.data as {
          match_number: string;
          key: string;
          alliances: {
            red: { team_keys: [string, string, string] };
            blue: { team_keys: [string, string, string] };
          };
        }[]
      ).map(
        (match: {
          match_number: string;
          key: string;
          alliances: {
            red: { team_keys: [string, string, string] };
            blue: { team_keys: [string, string, string] };
          };
        }) => ({
          match_num: match.match_number,
          match_key: match.key,
          alliances: match.alliances,
          // predicted_time: match.predicted_time,
        }),
      );
      return extractedData2 as {
        match_num: string;
        alliances: {
          red: { team_keys: [string, string, string] };
          blue: { team_keys: [string, string, string] };
        };
      }[];
    }),
});
