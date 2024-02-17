import { Text, View } from "react-native";
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
import { useCallback, useEffect, useState } from "react";
import Auto from "./Auto";
import Endgame from "./Endgame";
import Teleop from "./Teleop";
import { SafeAreaView } from "react-native-safe-area-context";
import Dangerous from "./components/Dangerous";
import { UltimateHistory } from "./types";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "~/utils/supabase";
import { api } from "~/utils/api";
import { godlyLog } from "@acme/api/src/router/scouting";

export default function Match() {
	const local = useLocalSearchParams();
	const rawUpdate = api.scouting.updateMatchLog.useMutation();
	const [godlyHistory, setGodlyHistory] = useState<{
		auto: UltimateHistory;
		teleop: UltimateHistory;
		endgame: UltimateHistory;
	}>({ auto: { log: [] }, teleop: { log: [] }, endgame: { log: [] } });
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
		update(godlyHistory);
	}, [godlyHistory, update]);
	return (
		<SafeAreaView className="mt-[-45px] h-full">
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
						setUltimateHistory={(stuff) => {
							setGodlyHistory((godlyHistory) => {
								return { ...godlyHistory, auto: stuff };
							});
						}}
					/>
					<Dangerous />
				</Tabs.Content>

				<Tabs.Content value="tab2" height={"100%"} paddingBottom="15%">
					<Teleop
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
						setUltimateHistory={(stuff) => {
							setGodlyHistory((godlyHistory) => {
								return { ...godlyHistory, endgame: stuff };
							});
						}}
					/>
					<Dangerous />
				</Tabs.Content>
			</Tabs>
		</SafeAreaView>
	);
}
