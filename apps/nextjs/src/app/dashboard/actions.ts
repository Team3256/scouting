import { createClient } from "@/lib/utils/supabase/client";

export async function addAssignment({ match, team, alliance, assignee }) {
	const supabase = createClient();
	console.log("sadfsafdfsd");
	const { data: profileData, error: profileError } = await supabase
		.from("profiles")
		.select("id")
		.eq("email", assignee)
		.single();

	const { data, error } = await supabase
		.from("assignments")
		.upsert([
			{
				match: match,
				team: team,
				alliance: alliance,
				assignee: profileData?.id,
				event_log: {
					auto: { log: [], checkboxes: null },
					teleop: { log: [], checkboxes: null },
					endgame: { log: [], checkboxes: null },
				},
			},
		])
		.select();

	if (error) {
		console.error("Error: ", error);
	} else {
		console.log("Data: ", data);
	}
}

export async function addEvents({ event }) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("events")
		.insert([
			{
				key: event.key,
				name: event.name,
			},
		])
		.select();

	if (error) {
		console.error("Error: ", error);
	} else {
		console.log("Data: ", data);
	}
}

export async function addMatches({ match }) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("matches")
		.insert([
			{
				key: match.match_key,
				event: match.event,
			},
		])
		.select();

	if (error) {
		console.error("Error: ", error);
	} else {
		console.log("Data: ", data);
	}
}

export async function getEmails(
	setMembers: (members: { [key: string]: string[] }) => void,
) {
	const supabase = createClient();

	// const { data, error } = await supabase.from("users").select("email");
	const { data, error } = await supabase.from("profiles").select("email");

	if (error) {
		console.error("Error: ", error);
	} else {
		console.log("Data: ", data);
	}

	const extractedEmails = data.map((obj) => obj.email);

	// Update the state to create an object where each email is a key with an empty array value
	setMembers((previousState) => ({
		...previousState, // This keeps existing state entries intact
		...extractedEmails.reduce((acc, email) => {
			acc[email] = [];
			return acc;
		}, {}),
	}));
}
