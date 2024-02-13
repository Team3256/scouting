import React, { useState } from "react";
import { View, Text } from "react-native";
import ActionButton from "./components/ActionButton";
import ActionGrid, { History } from "./components/ActionGrid";
import CheckboxWithLabel from "./components/CheckboxWithLabel";

export default function Auto() {
  const actions = ["Miss 📢", "Miss 🔊", "Score 📢", "Score 🔊"];
  const [history, setHistory] = useState<History>([]);
  const createActionHandler = (actionId: number) => {
    return () => {
      const newHistoryItem: [number, number] = [actionId, Date.now()];
      setHistory((currentHistory) => [...currentHistory, newHistoryItem]);
    };
  };

  return (
    <View>
      <CheckboxWithLabel
        size={"$4"}
        label="Gained Mobility"
        onCheckedChange={(event) => console.log(event.valueOf())}
      />
      <Text className="pl-3 text-lg">Scoring (Speaker = 📢 Amp = 🔊)</Text>
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
