"use client";

import { useState } from "react";
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
import { DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";

import { AssignmentCard, MemberCard } from "./components/cards";
import { CalendarDateRangePicker } from "./components/date-range-picker";
import { MainNav } from "./components/main-nav";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import { Search } from "./components/search";
import TeamSwitcher from "./components/team-switcher";
import { UserNav } from "./components/user-nav";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export default function Assignments() {
  // XXX: Use real data via tRPC
  const [members, setMembers] = useState<{ [key: string]: string[] }>(
    Object.fromEntries(tags.map((x) => [`${x}M`, []])),
  );
  const [assignments, setAssignments] = useState(tags.map((x) => `${x}A`));
  const [activeId, setActiveId] = useState<string | null>(null);
  // Inverted members
  const reverseAssignmentToMembers = Object.fromEntries(
    Object.entries(members).flatMap(([k, v]) => v.map((x) => [x, k])),
  );
  // const [parent, setParent] = useState(null);
  return (
    <DndContext
      onDragStart={function handleDragStart(event) {
        const active = event.active as { id: string };
        console.log("start", active);
        setActiveId(active.id);
      }}
      onDragEnd={function handleDragEnd(event) {
        const overId = event.over?.id;
        console.log("end", overId, activeId, members, assignments);
        if (overId === undefined) {
          // Drag action was cancelled
          return;
        }
        if (overId === "ASSIGNMENT_LIST") {
          if (assignments.includes(activeId as string)) {
            // Assignment already exists in the list
            return;
          }
          setAssignments((assignments) => [...assignments, activeId as string]);
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
    </DndContext>
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
