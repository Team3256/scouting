import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import type { UltimateHistory } from "./types";
import ActionButton from "./components/ActionButton";
import ActionGrid, { History } from "./components/ActionGrid";
import CheckboxWithLabel from "./components/CheckboxWithLabel";

export default function Auto({
  setUltimateHistory,
  ultimateHistory,
}: {
  setUltimateHistory: (history: UltimateHistory) => void;
  ultimateHistory: UltimateHistory;
}) {
  const actions = ["Miss 📢", "Miss 🔊", "Score 📢", "Score 🔊"];
  const history = ultimateHistory.log;
  const gainedMobility = ultimateHistory.checkboxes?.gainedMobility ?? false;
  const createActionHandler = (actionId: number) => {
    return () => {
      const newHistoryItem: [number, number] = [actionId, Date.now()];
      setUltimateHistory({
        ...ultimateHistory,
        log: [...ultimateHistory.log, newHistoryItem],
      } as UltimateHistory);
    };
  };
  function setHistory(history: History) {
    setUltimateHistory({
      ...ultimateHistory,
      log: history,
    } as UltimateHistory);
  }
  function setGainedMobility(gainedMobility: boolean) {
    setUltimateHistory({
      ...ultimateHistory,
      checkboxes: { gainedMobility },
    } as UltimateHistory);
  }

  return (
    <View className="mt-5">
      <View className="pl-3">
        <CheckboxWithLabel
          className="pl-[20px]"
          size={"$4"}
          label="Gained Mobility"
          defaultChecked={gainedMobility}
          onCheckedChange={(event) =>
            setGainedMobility(event.valueOf() as boolean)
          }
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
