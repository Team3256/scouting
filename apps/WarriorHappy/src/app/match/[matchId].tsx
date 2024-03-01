import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
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
import { ConsoleLogWriter } from "../../../../../packages/db";
import Auto from "./Auto";
import Dangerous from "./components/Dangerous";
import Endgame from "./Endgame";
import Teleop from "./Teleop";
import { UltimateHistory } from "./types";

export default function Match() {
  const local = useLocalSearchParams();
  const key = {
    matchKey: local.matchId as string,
    team: local.team as string,
  };
  console.log("Match Scouting RPC key:", key);
  const utils = api.useUtils();
  // staletime infinity = fetch once
  const { data, isLoading, isError } = api.scouting.getMatchLog.useQuery(key, {
    networkMode: "offlineFirst",
    staleTime: Infinity,
  });
  const rawUpdate = api.scouting.updateMatchLog.useMutation({
    networkMode: "offlineFirst",
    onSuccess: (data, variables, context) => {
      console.log("Mutation Data `onSuccess`:", data, variables, context);
      router.push("/");
      //   utils.scouting.getMatchLog.invalidateQuery();
    },
    // onError: (error, variables, context) => {
    // An error happened!
    // console.log(`rolling back optimistic update with id ${context.id}`);
    // },
    // onMutate: (x) => console.log("syntaxc", x),
  });
  //   const [godlyHistory, setGodlyHistory] = useState<{
  //     auto: UltimateHistory;
  //     teleop: UltimateHistory;
  //     endgame: UltimateHistory;
  //   } | null>(null);
  //   // TODO: Pre-emptively cache

  console.log("daata", data, isError);
  //   const update = useCallback(
  //     (h) => {
  //       rawUpdate.mutate({
  //         matchId: local.matchId as string,
  //         teamNum: local.team as string,
  //         godlyLog: h,
  //       });
  //     },
  //     [local, rawUpdate],
  //   );
  //   useEffect(() => {
  //     if (!isLoading) {
  //       console.log("set", data[0].eventLog);
  //       setGodlyHistory(data[0].eventLog);
  //     }
  //   }, [isLoading]);
  //   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  //   useEffect(() => {
  //     if (godlyHistory == null || isLoading) return;
  //     console.log(godlyHistory);
  //     update(godlyHistory);
  //   }, [godlyHistory, isLoading]);
  // if (isError) {
  // 	return (
  // 		<SafeAreaView className="mt-[-45px] h-full">
  // 			<Text>Nooo</Text>
  // 		</SafeAreaView>
  // 	);
  // }
  const godlyHistory = data?.[0]?.event_log as {
    auto: UltimateHistory;
    teleop: UltimateHistory;
    endgame: UltimateHistory;
  } | null;
  const [localEventLog, setLocalEventLog] = useState(
    // wont ever be used if it was null
    godlyHistory as {
      auto: UltimateHistory;
      teleop: UltimateHistory;
      endgame: UltimateHistory;
    },
  );
  const ready = !isLoading && localEventLog != null;
  useEffect(() => {
    if (godlyHistory) {
      setLocalEventLog(godlyHistory);
    }
  }, [godlyHistory]);
  const submit = () => {
    rawUpdate.mutate({
      ...key,
      eventLog: localEventLog,
    });
  };
  return (
    <SafeAreaView className="mt-[-45px] h-full">
      {!ready ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Button theme={"yellow"} onPress={submit}>
            SUBMIT
          </Button>
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
                ultimateHistory={localEventLog.auto}
                setUltimateHistory={(stuff) => {
                  console.log("stuff", stuff);
                  setLocalEventLog((x) => {
                    return { ...x, auto: stuff };
                  });
                }}
              />
              <Dangerous
                ultimateHistory={localEventLog.auto}
                setUltimateHistory={(stuff) => {
                  console.log("stuff", stuff);
                  setLocalEventLog((x) => {
                    return { ...x, auto: stuff };
                  });
                }}
              />
            </Tabs.Content>

            <Tabs.Content value="tab2" height={"100%"} paddingBottom="15%">
              <Teleop
                ultimateHistory={localEventLog.teleop}
                setUltimateHistory={(stuff) => {
                  setLocalEventLog((x) => {
                    return { ...x, teleop: stuff };
                  });
                }}
              />
              <Dangerous
                ultimateHistory={localEventLog.teleop}
                setUltimateHistory={(stuff) => {
                  setLocalEventLog((x) => {
                    return { ...x, teleop: stuff };
                  });
                }}
              />
            </Tabs.Content>
            <Tabs.Content value="tab3" height={"100%"} paddingBottom="15%">
              <Endgame
                ultimateHistory={localEventLog.endgame}
                setUltimateHistory={(stuff) => {
                  setLocalEventLog((x) => {
                    return { ...x, endgame: stuff };
                  });
                }}
              />
              <Dangerous
                ultimateHistory={localEventLog.endgame}
                setUltimateHistory={(stuff) => {
                  setLocalEventLog((x) => {
                    return { ...x, endgame: stuff };
                  });
                }}
              />
            </Tabs.Content>
          </Tabs>
        </View>
      )}
    </SafeAreaView>
  );
}
