import type { CheckboxProps, SizeTokens } from "tamagui";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  ArrowLeftCircle,
  Check as CheckIcon,
  Plus,
} from "@tamagui/lucide-icons";
import { Button, Checkbox, Label, XStack, YStack } from "tamagui";

import type { UltimateHistory } from "./types";
import ActionButton from "./components/ActionButton";
import ActionGrid, { History } from "./components/ActionGrid";
import CheckboxWithLabel from "./components/CheckboxWithLabel";

export default function Endgame({
  setUltimateHistory,
}: {
  setUltimateHistory: (history: UltimateHistory) => void;
}) {
  const [history, setHistory] = useState<History>([]);
  useEffect(() => {
    setUltimateHistory({ log: history });
  }, [history]);
  return (
    <View className="mt-5">
      <Text className="pl-3 text-lg">Scoring (Trap=🚪, Hanging=⛓️)</Text>
      <ActionGrid
        actions={["Miss 🚪", "Miss ⛓️", "Score 🚪", "Score ⛓️"]}
        history={history}
        setHistory={setHistory}
        themeOverrides={["red", "red", "green", "green"]}
      />
    </View>
  );
}

//DC buttons
