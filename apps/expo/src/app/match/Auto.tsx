import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ActionButton from "./components/ActionButton";
import ActionGrid, { History } from "./components/ActionGrid";
import CheckboxWithLabel from "./components/CheckboxWithLabel";
import type { UltimateHistory } from "./types";

export default function Auto({
  setUltimateHistory,
}: {
  setUltimateHistory: (history: UltimateHistory) => void;
}) {
  const actions = ["Miss 📢", "Miss 🔊", "Score 📢", "Score 🔊"];
  const [history, setHistory] = useState<History>([]);
  const [gainedMobility, setGainedMobility] = useState(false);
  const createActionHandler = (actionId: number) => {
    return () => {
      const newHistoryItem: [number, number] = [actionId, Date.now()];
      setHistory((currentHistory) => [...currentHistory, newHistoryItem]);
    };
  };
  useEffect(() => {
    setUltimateHistory({ log: history, checkboxes: { gainedMobility } });
  }, [history, gainedMobility]);

  const test = (x: boolean) => {
    console.log("TEEEEEESTt");
    setGainedMobility(x);
  };

  return (
    <View className="mt-5">
      <View className="pl-3">
        <CheckboxWithLabel
          className="pl-[20px]"
          size={"$4"}
          label="Gained Mobility"
          onCheckedChange={(event) => test(event.valueOf() as boolean)}
        />
      </View>

      <Text className="mt-3 pl-3 text-lg">Scoring (Speaker = 📢 Amp = 🔊)</Text>
      <ActionGrid
        actions={actions}
        history={history}
        setHistory={setHistory}
        themeOverrides={["red", "red", "green", "green"]}
      />
      <View style={{ marginHorizontal: 20 }}>
        <ActionButton
          label={`Intake Note (${history.filter(([i]) => i === 4).length})`}
          action={createActionHandler(4)}
        />
      </View>
    </View>
  );
}
