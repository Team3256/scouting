import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DragOverlay, useDraggable, useDroppable } from "@dnd-kit/core";

// XXX: Properly conform to database types
export function MemberCard({
  user,
  assignments,
}: {
  user: string;
  assignments: string[];
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: user,
  });
  const str =
    typeof user === "string" && user.length >= 2 ? user[0] + user[1] : "";
  return (
    // <DragOverlay>
    <Card
      className={`h-fit w-fit transition-all ${isOver && "bg-accent"}`}
      ref={setNodeRef}
    >
      <CardHeader>
        <CardTitle>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>{str.toUpperCase()}</AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription>{user}</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        {assignments.length === 0 ? (
          <p className="text-muted-foreground max-w-sm text-sm">
            No assignments were assigned
          </p>
        ) : (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                See ({assignments.length}) assignment
                {assignments.length > 1 && "s"}
              </AccordionTrigger>
              <AccordionContent>
                {assignments.map((assignment) => (
                  <AssignmentCard key={assignment} assignment={assignment} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* </Button> */}
        {/* <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form> */}
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
}
export function AssignmentCard({ assignment }: { assignment: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: assignment,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Card
      className="z-50 h-fit w-fit"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <CardHeader>
        <CardTitle>Match Scouting Assignment</CardTitle>
        <CardDescription>{assignment}</CardDescription>
      </CardHeader>
      <CardContent>
        {" "}
        I HAVE NO GIRLS
        {/* </Button> */}
        {/* <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form> */}
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
}
