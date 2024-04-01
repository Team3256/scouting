"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/utils/trpc";

import Assignments from "./Assignments";

type Event = {
  name: string;
  key: string;
};

type ModalSelectComponentProps = {
  events: Event[];
  selectedEvent: string;
  setSelectedEvent: (value: string) => void;
};

function DashboardPage() {
  const [selectedEvent, setSelectedEvent] = useState("Choose Event");

  const { data, error, isLoading, refetch } = trpc.tba.teamEvents.useQuery(
    { teamKey: "frc3256", year: 2024 },
    {
      enabled: false,
    },
  );
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  const events =
    data?.map((event) => ({
      name: event.name,
      key: event.key,
    })) ?? [];

  const handleValueChange = (value: string) => {
    setSelectedEvent(value);
  };

  const ModalSelectComponent: FC<ModalSelectComponentProps> = ({
    events,
    selectedEvent,
    setSelectedEvent,
  }) => (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>{selectedEvent}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select an Option</DialogTitle>
          </DialogHeader>
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose One" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem
                  key={event.name}
                  value={event.key}
                  onSelect={() => console.log(event)}
                >
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <ModalSelectComponent
            events={events}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
        </div>
      </div>
      <Tabs defaultValue="assignments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assignments">Scouting Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="assignments" className="h-[75vh] space-y-4">
          <Assignments selectedEvent={selectedEvent} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default trpc.withTRPC(DashboardPage);
