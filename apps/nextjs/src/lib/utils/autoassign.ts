export function assignTasks(times: string[], users: string[]) {
  // Sort the times for ordered assignment
  const sortedTimes = times.sort();

  // Initialize assignments, lastAssigned, and taskCount objects
  const assignments: { [key: string]: string[] } = {};
  const lastAssigned: { [key: string]: string | null } = {};
  const taskCount: { [key: string]: number } = {};
  // biome-ignore lint/complexity/noForEach: <explanation>
  users.forEach((user) => {
    assignments[user] = [];
    lastAssigned[user] = null;
    taskCount[user] = 0;
  });

  for (const time of sortedTimes) {
    // Find the user with the least tasks and no concurrent task (if possible)
    let bestUser = null;
    for (const user of users) {
      if (!lastAssigned[user] || lastAssigned[user] !== time) {
        bestUser = bestUser || user; // Assign the first available user
        if (taskCount[user] < taskCount[bestUser]) {
          bestUser = user; // Update if a user with fewer tasks is found
        }
      }
    }

    // Assign the task to the best user or the first available user
    if (bestUser) {
      assignments[bestUser].push(time);
      lastAssigned[bestUser] = time;
      taskCount[bestUser]++;
    } else {
      console.warn("No user available for time:", time); // Log a warning if no user is available
    }
  }

  return assignments;
}

// // Example usage:
// const times = ['10:00', '10:30', '11:00', '11:30'].reduce((acc, time) => acc.concat(Array(6).fill(time)), []);
// const users = ['Bryan', 'has', 'no', 'girls', 'also', 'the', 'scouting', 'app', 'works','on','his','computer'];

// const assignments = assignTasks(times, users);
// for (const user in assignments) {
//   console.log(`${user}: ${assignments[user]}`);
// }
