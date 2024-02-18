import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import {
	Button,
	H5,
	isWeb,
	Separator,
	SizableText,
	Tabs,
	TabsContentProps,
	XStack,
	YStack,
} from "tamagui";

import { api } from "~/utils/api";
import { supabase } from "~/utils/supabase";
import Auto from "./Auto";
import Dangerous from "./components/Dangerous";
import Endgame from "./Endgame";
import Teleop from "./Teleop";
import { UltimateHistory } from "./types";

export default function Match() {
	const local = useLocalSearchParams();
	const rawUpdate = api.scouting.updateMatchLog.useMutation();
	const [godlyHistory, setGodlyHistory] = useState<{
		auto: UltimateHistory;
		teleop: UltimateHistory;
		endgame: UltimateHistory;
	} | null>(null);
	// TODO: Pre-emptively cache
	const { data, isLoading } = api.scouting.getMatchLog.useQuery({
		matchId: local.matchId as string,
	});

	const update = useCallback(
		(h) => {
			rawUpdate.mutate({
				matchId: local.matchId as string,
				teamNum: local.team as string,
				godlyLog: h,
			});
		},
		[local, rawUpdate],
	);
	useEffect(() => {
		if (!isLoading) {
			console.log("set", data[0].eventLog);
			setGodlyHistory(data[0].eventLog);
		}
	}, [isLoading]);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (godlyHistory == null || isLoading) return;
		console.log(godlyHistory);
		update(godlyHistory);
	}, [godlyHistory, isLoading]);
	// if (isError) {
	// 	return (
	// 		<SafeAreaView className="mt-[-45px] h-full">
	// 			<Text>Nooo</Text>
	// 		</SafeAreaView>
	// 	);
	// }
	const ready = !isLoading && godlyHistory != null;
	return (
		<SafeAreaView className="mt-[-45px] h-full">
			{!ready ? (
				<Text>Wnat</Text>
			) : (
				<Tabs defaultValue="tab1" flexDirection="column">
					<Tabs.List gap>
						<Tabs.Tab value="tab1">
							<SizableText>Auto</SizableText>
						</Tabs.Tab>

						<Tabs.Tab value="tab2">
							<SizableText>Teleop</SizableText>
						</Tabs.Tab>
						<Tabs.Tab value="tab3">
							<SizableText>Endgame</SizableText>
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Content value="tab1" height={"100%"} paddingBottom="15%">
						<Auto
							initialHistory={godlyHistory?.auto}
							setUltimateHistory={(stuff) => {
								setGodlyHistory((godlyHistory) => {
									console.log("stuff", { ...godlyHistory, auto: stuff });
									return { ...godlyHistory, auto: stuff };
								});
							}}
						/>
						<Dangerous />
					</Tabs.Content>

					<Tabs.Content value="tab2" height={"100%"} paddingBottom="15%">
						<Teleop
							initialHistory={godlyHistory?.teleop}
							setUltimateHistory={(stuff) => {
								setGodlyHistory((godlyHistory) => {
									return { ...godlyHistory, teleop: stuff };
								});
							}}
						/>
						<Dangerous />
					</Tabs.Content>
					<Tabs.Content value="tab3" height={"100%"} paddingBottom="15%">
						<Endgame
							initialHistory={godlyHistory?.endgame}
							setUltimateHistory={(stuff) => {
								setGodlyHistory((godlyHistory) => {
									return { ...godlyHistory, endgame: stuff };
								});
							}}
						/>
						<Dangerous />
					</Tabs.Content>
				</Tabs>
			)}
		</SafeAreaView>
	);
}
