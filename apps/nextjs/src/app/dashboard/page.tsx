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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/utils/trpc";

// import { allEvents } from "../matches/getEvents";
import { allEvents } from "../matches/getEvents";
import { addEvents } from "./actions";
import Assignments from "./Assignments";
import { CalendarDateRangePicker } from "./components/date-range-picker";
import { MainNav } from "./components/main-nav";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import { Search } from "./components/search";
import TeamSwitcher from "./components/team-switcher";
import { UserNav } from "./components/user-nav";

// export const metadata: Metadata = {
// title: "Dashboard",
// description: "Example dashboard app built using the components.",
// };

const ModalSelectComponent = ({ events, selectedEvent, setSelectedEvent }) => {
  const handleValueChange = (value) => {
    setSelectedEvent(value);
  };

  return (
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
            {/* <SelectTrigger className="w-[180px]">
              <SelectValue>
                {selectedEvent ? selectedEvent : "Choose one"}
              </SelectValue>
            </SelectTrigger> */}
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
            <Button onClick={() => console.log("PLEASE: ", selectedEvent)}>
              test
            </Button>
          </Select>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function DashboardPage() {
  const [events, setEvents] = useState([]);
  // const [keys, setKeys] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("Choose one");

  useEffect(() => {
    handleSubmit();
  }, []);

  const { data, refetch } = trpc.tba.teamEvents.useQuery(
    {
      teamKey: "frc3256",
      year: 2023,
    },
    { enabled: false },
  );

  const handleSubmit = async () => {
    try {
      refetch();
      setEvents(data.map((event) => ({ name: event.name, key: event.key })));

      // setKeys(data.map((event) => event.key));
      console.log("I AM RIGH THERE: ", selectedEvent);
      // addEvents({ events: { name: "test", key: "test" } });
      for (let i = 0; i < events.length; i++) {
        console.log("EVENTS: ", events[i]);
        addEvents({ event: events[i] });
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
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
          {/* <CalendarDateRangePicker /> */}
          {/* <Button>Download</Button> */}
          {/* <button type="button" onClick={handleSubmit}>
            hello
          </button> */}
          <Button type="button" onClick={handleSubmit}>
            Fetch Events
          </Button>
          {/* <p>DATA: </p> */}
          {/* {allEvents("frc3256", 2024)} */}
          {/* <allEvents team="frc3256" y={2024} /> */}
        </div>
      </div>
      <Tabs defaultValue="assignments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assignments">Scouting Assignments</TabsTrigger>
          <TabsTrigger value="attendance" disabled>
            Attendance
          </TabsTrigger>
          <TabsTrigger value="overview" disabled>
            Team Overview
          </TabsTrigger>
          <TabsTrigger value="management" disabled>
            Management
          </TabsTrigger>
        </TabsList>
        <TabsContent value="assignments" className="h-[75vh] space-y-4">
          <Assignments selectedEvent={selectedEvent} />
        </TabsContent>
        {/* <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-muted-foreground h-4 w-4"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-muted-foreground text-xs">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Subscriptions
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-muted-foreground h-4 w-4"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-muted-foreground text-xs">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-muted-foreground h-4 w-4"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-muted-foreground text-xs">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-muted-foreground h-4 w-4"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-muted-foreground text-xs">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent> */}
      </Tabs>
    </div>
  );
}

export default trpc.withTRPC(DashboardPage);
