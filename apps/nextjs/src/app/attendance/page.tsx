"use client";

// Use the tRPC methods to get the latest meeting. Have a button that says "Check In" that gets the user's location and checks them in via tRPC method.
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";

import type { RouterOutputs } from "@acme/api";

import { api } from "~/trpc/react";

export default function AttendancePage() {
  let [location, setLocation] = useState<GeolocationPosition | null>(null);
  let [error, setError] = useState<string | null>(null);
  let [loading, setLoading] = useState(false);
  let [meeting, setMeeting] = useState<any | null>(null);
  let data = api.attendance.getMeetings.useQuery();
  const checkInMutation = api.attendance.checkIntoMeeting.useMutation({
    onError: (error) => {
      console.log(error);
      alert("Error checking in, please see console");
    },
  });
  console.log(data.data);

  return (
    <div>
      <h1> Attendance </h1>
      <div>
        <h2> Meetings </h2>
        <hr />
        {data.data?.map((meeting) => (
          <Fragment key={meeting.id}>
            <div key={meeting.id}>
              <h3>{meeting.name}</h3>
              <p>Meeting ID: {meeting.id}</p>
              <p>{meeting.isLocationAtSchool}</p>
              <p>{meeting.date.toString()}</p>
              <p>Location ID: {meeting.locationId}</p>
              <button
                onClick={() => {
                  checkInMutation.mutate({
                    location: {
                      latitude: "40.7128",
                      longitude: "74.006",
                    },
                    meetingId: meeting.id,
                  });
                }}
              >
                CHECK IN
              </button>
            </div>
            <hr />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
