import type { CheckboxProps, SizeTokens } from "tamagui";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  ArrowLeftCircle,
  Check as CheckIcon,
  Plus,
} from "@tamagui/lucide-icons";
import { Button, Checkbox, Label, XStack, YStack } from "tamagui";

import ActionButton from "./components/ActionButton";
import ActionGrid from "./components/ActionGrid";
import CheckboxWithLabel from "./components/CheckboxWithLabel";

export default function Auto() {
  const actions = ["Amp", "Speaker", "Intake"];
  return (
    <View>
      <CheckboxWithLabel size={20} label="Gained Mobility" />
      <Text className="pl-3 text-lg">Scoring (Speaker = 📢 Amp = 🔊)</Text>
      <ActionGrid
        actions={["Miss 📢", "Miss 🔊", "Score 📢", "Score 🔊"]}
        onHistoryChanged={(x) => console.log(x)}
        themeOverrides={["red", "red", "green", "green"]}
      />
    </View>
  );
}
