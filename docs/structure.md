# Structure

The original idea was that we would combine a lot of the software logistics we use into the single suite. We are currently only focused on getting a functional scouting app (dubbed Emotions), so please ignore any mention of strategy or attendance. This is an old, informal document subject to removal, but kept here for historical purposes and may potentially serve as a useful overview of the app. See [FUTURE](./future.md) for more information on what the app should be, what it is now, and how to get there.

- WarriorHappy (Mobile App):
  - Client side app for members, using Expo
  - Local-first
  - Mobile-first
  - attendance (scan QR code)
  - scouting
    - qualitative
    - quantative
    - pit
    - per match, students are assigned to watch robots (quantitative) or go around the pit to collect data
      - a certain number of people are assigned to qualitative scouting, for thinks like driver ranking, et al
    - this data is uploaded to the server via tRPC
    - peer-to-peer data sharing
- WarriorSAD (Scouting Admin Dashboard):
  - Using NextJS
  - Desktop-first
  - app for leads + strategy
  - you have 3 views:
    - per-team (shows data averaged for a team)
    - per-match (shows data collected per-robot for a match)
    - overall (all teams averaged)
    - assign per match
    - match predictions
    - picklist generator
      - See [https://www.citruscircuits.org/uploads/6/9/3/4/6934550/2023_whitepaper.pdf](https://www.citruscircuits.org/uploads/6/9/3/4/6934550/2023_whitepaper.pdf) (page 54)
