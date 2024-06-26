import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import axios from "axios";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const tbaRouter = createTRPCRouter({
  teamEvents: publicProcedure
    .input(z.object({ teamKey: z.string() }))
    .input(z.object({ year: z.number() }))
    .query(async ({ input }) => {
      const response = await axios.get(
        `https://www.thebluealliance.com/api/v3/team/${input.teamKey}/events/${input.year}`,
        // `https://www.thebluealliance.com/api/v3/team/${input.teamKey}/events/`,
        {
          headers: {
            "X-TBA-Auth-Key":
              "5CnvqgQnVEtePAqwFls3PnlxxKFW88o67RAP6zPlZXGtWV6B6Mx7mSkBlfonEp4c",
          },
        },
      );

      const extractedData = (
        response.data as { event_code: string; key: string; name: string }[]
      ).map((event: { event_code: string; name: string }) => ({
        event_code: event.event_code,
        key: event.key,
        name: event.name,
      }));

      return extractedData as {
        event_code: string;
        key: string;
        name: string;
      }[];
    }),
  eventMatches: publicProcedure
    .input(z.object({ teamKey: z.string() }))
    .input(z.object({ eventKey: z.string() }))
    .query(async ({ input }) => {
      const response = await axios.get(
        `https://www.thebluealliance.com/api/v3/team/${input.teamKey}/event/${input.eventKey}/matches/simple`,
        {
          headers: {
            "X-TBA-Auth-Key":
              "5CnvqgQnVEtePAqwFls3PnlxxKFW88o67RAP6zPlZXGtWV6B6Mx7mSkBlfonEp4c",
          },
        },
      );
      const extractedData2 = (
        response.data as {
          match_number: number;
          key: string;
          alliances: {
            red: { team_keys: [string, string, string] };
            blue: { team_keys: [string, string, string] };
          };
        }[]
      ).map(
        (match: {
          match_number: number;
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
      return extractedData2;
    }),
});
