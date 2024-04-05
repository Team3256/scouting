"use client";

import { useEffect, useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assignTasks } from "@/lib/utils/autoassign";
import { trpc } from "@/lib/utils/trpc";
import { DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";

import { addAssignment, addMatches, getEmails } from "./actions";
import { AssignmentCard, MemberCard } from "./components/cards";
import { CalendarDateRangePicker } from "./components/date-range-picker";
import { MainNav } from "./components/main-nav";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import { Search } from "./components/search";
import TeamSwitcher from "./components/team-switcher";
import { UserNav } from "./components/user-nav";

type AssignmentsProps = {
  selectedEvent: string;
};

type Match = {
  match_num: number;
  match_key: string;
  alliances: {
    blue: {
      team_keys: string[];
    };
    red: {
      team_keys: string[];
    };
  };
};

type MatchSubset = {
  match_num: number;
  alliances: {
    blue: {
      team_keys: string[];
    };
    red: {
      team_keys: string[];
    };
  };
};

type Alliance = {
  team_keys: string[];
};

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);
function autoAssign(
  assignments: string[],
  members: { [key: string]: string[] },
  setMembers: (members: { [key: string]: string[] }) => void,
  setAssignments: (assignments: string[]) => void,
) {
  // useEffect(() => {
  const autoassign = assignTasks(assignments, Object.keys(members));
  console.log(autoassign, typeof autoassign);
  setMembers(autoassign);
  setAssignments([]);
  // }, []);
}
function Assignments({ selectedEvent }) {
  // XXX: Use real data via tRPC
  // const [members, setMembers] = useState<{ [key: string]: string[] }>(
  //   Object.fromEntries(tags.map((x) => [`${x}M`, []])),
  // );
  const [members, setMembers] = useState<{ [key: string]: string[] }>({});
  // Object.fromEntries(tags.map((x) => [`${x}M`, []])),

  //use useEffect to make a supabase request from the auth tabke to fill it with emails
  useEffect(() => {
    async function fetchData() {
      getEmails(setMembers);
      console.log("HEEEEE: ", members);
    }
    fetchData();
  }, [members]);
  const [assignments, setAssignments] = useState<string[]>([]); // Updated t
  const [activeId, setActiveId] = useState<string | null>(null);
  // Inverted members
  const reverseAssignmentToMembers = Object.fromEntries(
    Object.entries(members).flatMap(([k, v]) => v.map((x) => [x, k])),
  );
  // const [parent, setParent] = useState(null);
  // const { data, isLoading } = trpc.tba.teamEvents.useQuery({
  // teamKey: "frc3256",
  // year: 2023,
  // });

  const { data, isLoading } = trpc.tba.eventMatches.useQuery({
    teamKey: "frc3256",
    eventKey: selectedEvent,
  });
  if (!isLoading) {
    console.log("DATA: ", data);
    console.log("SELECTED EVENT: ", selectedEvent);
  }
  useEffect(() => {
    if (!isLoading && data) {
      // Extract relevant information from the data and generate assignments
      const matches = data.map((match: Match) => ({
        match_num: match.match_num,
        // match_key: match.match_key,
        alliances: match.alliances,
      }));
      const matchKeys = data.map((match: Match) => ({
        match_key: match.match_key,
        event: selectedEvent,
      }));
      console.log("MATCHES: ", matchKeys);
      // for(int i = 0; i < matchKeys.length; i++) {
      //   addMatches({ match: matchKeys[i] });
      // }
      for (let i = 0; i < matchKeys.length; i++) {
        addMatches({ match: matchKeys[i] });
      }
      const newAssignments: string[] = [];
      // Iterate over each match object
      let count = 0;
      let c2 = 1;
      // biome-ignore lint/complexity/noForEach: <explanation>
      matches.forEach((match: MatchSubset) => {
        // Extract match number and alliances
        const { match_num, match_key, alliances } = match;

        // Iterate over each alliance (blue and red)
        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.values(alliances).forEach((alliance: Alliance) => {
          // Extract team keys from the alliance
          const teamKeys = alliance.team_keys;

          // Iterate over each team key
          // biome-ignore lint/complexity/noForEach: <explanation>
          teamKeys.forEach((teamKey: string) => {
            // Construct the assignment string with match number and team number
            const assignment = `Match ${c2} - Team ${teamKey}`;
            // const assignment = `Match ${match_key} - Team ${teamKey}`;
            count++;
            if (count % 6 === 0) {
              count = 0;
              c2++;
            }
            // Check if the assignment already exists in the assignments array
            if (!newAssignments.includes(assignment)) {
              // If not, add it to the newAssignments array
              newAssignments.push(assignment);
            }
          });
        });
      });

      // Update the state with the newAssignments array
      setAssignments(newAssignments);
    }
  }, [isLoading, data, selectedEvent]);
  return (
    <>
      {/* <ModalSelectComponent /> */}

      <DndContext
        onDragStart={function handleDragStart(event) {
          const active = event.active as { id: string };
          console.log("start", active);
          setActiveId(active.id);
        }}
        onDragEnd={function handleDragEnd(event) {
          const overId = event.over?.id;
          console.log(
            "end",
            "OVERID: ",
            overId,
            "ACTIVE ID: ",
            activeId,
            members,
            assignments,
          );

          // Find the match object corresponding to the activeTeamKey
          if (activeId && data) {
            const activeTeamKey = activeId.split(" ")[4];
            const match = data.find((match) => {
              // Check if activeTeamKey is part of the blue alliance
              if (match.alliances.blue.team_keys.includes(activeTeamKey)) {
                return true; // Return true if found in blue alliance
              }
              // Check if activeTeamKey is part of the red alliance
              if (match.alliances.red.team_keys.includes(activeTeamKey)) {
                return true; // Return true if found in red alliance
              }
              return false; // Return false if not found in either alliance
            });

            // Check if the activeTeamKey is part of the blue alliance or the red alliance
            const allianceColor = match.alliances.blue.team_keys.includes(
              activeTeamKey,
            )
              ? "blue"
              : "red";
            console.log("Alliance color:", allianceColor);

            // Find the index of the match object within the data array
            // const index = data.indexOf(match);
            // Find the index of the team key within the blue or red alliance array
            let index: number;
            if (allianceColor === "blue") {
              index = match.alliances.blue.team_keys.indexOf(activeTeamKey);
            } else {
              index = match.alliances.red.team_keys.indexOf(activeTeamKey);
            }

            // If the team key is found, return the corresponding index + 1
            if (index !== -1) {
              const correspondingIndex = index + 1;
              console.log("Corresponding index:", correspondingIndex);
            } else {
              console.log("Team key not found in data.");
            }

            const alliance = (allianceColor + (index + 1)) as string;
            const matchNumber = Number.parseInt(activeId.split(" ")[1]);

            // Make sure index is within the valid range of data array

            const currentMatchKey = data[matchNumber - 1].match_key;
            const currentTeam = Number.parseInt(
              activeId.split(" ")[4].slice(-4),
            );

            addAssignment({
              match: currentMatchKey,
              team: currentTeam,
              alliance: alliance,
              assignee: overId,
            });
          }

          if (overId === undefined) {
            // Drag action was cancelled
            return;
          }
          if (overId === "ASSIGNMENT_LIST") {
            if (assignments.includes(activeId as string)) {
              // Assignment already exists in the list
              return;
            }
            setAssignments((assignments) => [
              ...assignments,
              activeId as string,
            ]);
            setMembers((members) => {
              const prevMember = reverseAssignmentToMembers[activeId as string];
              return {
                ...members,
                [prevMember]: members[prevMember].filter((x) => x !== activeId),
              };
            });
            setActiveId(null);
            return;
          }
          if (members[overId].includes(activeId as string)) {
            // Assignment already exists in the member's list
            return;
          }
          const prevMember = reverseAssignmentToMembers[activeId as string];
          if (prevMember !== undefined) {
            setMembers((members) => {
              return {
                ...members,
                [overId]: [...members[overId], activeId as string],
                [prevMember]: members[prevMember].filter((x) => x !== activeId),
              };
            });
          } else {
            setMembers((members) => {
              return {
                ...members,
                [overId]: [...members[overId], activeId as string],
              };
            });
          }
          setAssignments((assignments) =>
            assignments.filter((x) => x !== activeId),
          );
          setActiveId(null);
        }}
      >
        <ResizablePanelGroup
          direction="horizontal"
          className="max-w-screen h-rounded-lg h-full border"
        >
          <ResizablePanel defaultSize={50}>
            <ScrollArea className="h-full w-full rounded-md border">
              <div className="flex flex-wrap">
                {Object.entries(members).map(([name, values]) => (
                  <MemberCard key={name} user={name} assignments={values} />
                ))}
              </div>
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle={true} />
          <ResizablePanel defaultSize={50}>
            <AssignmentList assignments={assignments} />
            <DragOverlay>
              {activeId && <AssignmentCard assignment={activeId} />}
            </DragOverlay>
            {/* <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup> */}
          </ResizablePanel>
        </ResizablePanelGroup>
        <Button
          onClick={() =>
            autoAssign(assignments, members, setMembers, setAssignments)
          }
        >
          Auto Assign
        </Button>
      </DndContext>
    </>
  );
}
function AssignmentList({ assignments }: { assignments: string[] }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "ASSIGNMENT_LIST",
  });
  return (
    <ScrollArea
      ref={setNodeRef}
      className={`h-full w-full rounded-md border ${isOver && "bg-accent"}`}
    >
      <div className="flex flex-wrap">
        {assignments.map((x) => (
          <AssignmentCard key={x} assignment={x} />
        ))}
      </div>
    </ScrollArea>
  );
}
export default trpc.withTRPC(Assignments);
