import { Text, View } from "react-native";
import { XStack } from "tamagui";

import ActionButton from "./components/ActionButton";
import ActionGrid, { History } from "./components/ActionGrid";
import { useEffect, useState } from "react";
import type { UltimateHistory } from "./types";

export default function Teleop({
  setUltimateHistory,
}: {
  setUltimateHistory: (history: UltimateHistory) => void;
}) {
  const [history, setHistory] = useState<History>([]);
  const intakeActions = [
    "Human",
    "Ground",
    // "Climb",
    // "Shoot Amp",
    // "Miss Speaker",
    // "Miss Amp",
    // "Intake Ground",📢
    // "Contact with Bot",
  ];
  const shooterActions = ["Speaker", "Amp", "Miss S📢", "Miss Amp"];
  useEffect(() => {
    setUltimateHistory({ log: history });
  }, [history]);
  return (
    <View className="mt-5">
      <Text className="pl-3 text-lg">Intake</Text>
      <ActionGrid
        actions={intakeActions}
        history={history}
        setHistory={setHistory}
      />
      <Text className="pl-3 text-lg">Scoring (Speaker = 📢, Amp = 🔊)</Text>
      <ActionGrid
        actions={shooterActions}
        history={history}
        setHistory={setHistory}
        hideUndo={true}
        indexOverrides={{
          0: shooterActions.length,
          1: shooterActions.length + 1,
          2: shooterActions.length + 2,
          3: shooterActions.length + 3,
        }}
        themeOverrides={["green", "green", "red", "red"]}
      />
    </View>
  );
}
