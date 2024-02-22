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
  const [activeId, setActiveId] = useState(null);
  // const [parent, setParent] = useState(null);
  return (
    <DndContext
      onDragStart={function handleDragStart(event) {
        const { active } = event;
        console.log("start", active);
        setActiveId(active?.id);
      }}
      onDragEnd={function handleDragEnd(event) {
        const { over } = event;
        console.log("end", activeId, over);
        setActiveId(null);
        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        // setParent(over ? over.id : null);
      }}
    >
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-screen h-rounded-lg h-full border"
      >
        <ResizablePanel defaultSize={50}>
          <ScrollArea className="h-full w-full rounded-md border">
            <div className="flex flex-wrap">
              {tags.map((x) => (
                <MemberCard key={x} user={`${x}P`} />
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle={true} />
        <ResizablePanel defaultSize={50}>
          <ScrollArea className="h-full w-full rounded-md border">
            <div className="flex flex-wrap">
              {tags.map((x) => (
                <AssignmentCard key={x} assignment={`${x}A`} />
              ))}
            </div>
          </ScrollArea>
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
