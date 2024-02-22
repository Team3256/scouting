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
import { DndContext, DragOverlay } from "@dnd-kit/core";

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
  // XXX: Use real data
  const [members, setMembers] = useState<{ [key: string]: string[] }>(
    Object.fromEntries(tags.map((x) => [`${x}M`, []])),
  );
  const [assignments, setAssignments] = useState(tags.map((x) => `${x}A`));
  const [activeId, setActiveId] = useState<string | null>(null);
  // const [parent, setParent] = useState(null);
  return (
    <DndContext
      onDragStart={function handleDragStart(event) {
        const active = event.active as { id: string };
        console.log("start", active);
        setActiveId(active.id);
      }}
      onDragEnd={function handleDragEnd(event) {
        const over = event.over as { id: string };
        console.log("end", activeId, over);
        setMembers((members) => {
          return {
            ...members,
            [over.id]: [...members[over.id], activeId as string],
          };
        });
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
                <MemberCard key={name} user={name} />
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle={true} />
        <ResizablePanel defaultSize={50}>
          <ScrollArea className="h-full w-full rounded-md border">
            <div className="flex flex-wrap">
              {assignments.map((x) => (
                <AssignmentCard key={x} assignment={x} />
              ))}
            </div>
          </ScrollArea>
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
