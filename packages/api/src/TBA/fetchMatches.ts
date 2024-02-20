interface MatchScoutAssignment {
  alliance: "red" | "blue";
  team: number;
  red: [number, number, number];
  blue: [number, number, number];
  // start_times: string;
}
const matchScoutAssignments: MatchScoutAssignment[] = [];
const eventKey = "2020miket";
const url = `https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`;
const options = {
  method: "GET",
  headers: {
    "X-TBA-Auth-Key":
      // process.env.TBA_KEY ??
      "5CnvqgQnVEtePAqwFls3PnlxxKFW88o67RAP6zPlZXGtWV6B6Mx7mSkBlfonEp4c",
  },
};

fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((match: any) => {
      matchScoutAssignments.push({
        alliance: match.match_number,
        team: 0,
        red: match.alliances.red.team_keys.map((team: string) => team),
        blue: match.alliances.blue.team_keys.map((team: string) => team),
        // start_times: new Date(match.time * 1000).toLocaleString(),
      });
      // matchScoutAssignments.push(match.alliances.red.team_keys);
      // matchScoutAssignments.push(match.alliances.blue.team_keys);
      // console.log(`Match Number: ${match.match_number}`);
      // console.log("Red Alliance Teams:", match.alliances.red.team_keys);
      // console.log("Blue Alliance Teams:", match.alliances.blue.team_keys);
      // console.log(
      //   "Scheduled Start Time:",
      //   new Date(match.time * 1000).toLocaleString(),
      // );
      // console.log("--------------------------------");
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

export default matchScoutAssignments;
// export const matchScoutAssignments: MatchScoutAssignment[] = [
//   { alliance: "red", team: 5, red: [23422234, 2, 3], blue: [4, 5, 6] },
//   { alliance: "red", team: 5, red: [234234, 2, 3], blue: [4, 5, 6] },
// ];
