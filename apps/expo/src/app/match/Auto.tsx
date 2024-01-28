import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "tamagui";
import { Plus, ArrowLeftCircle } from "@tamagui/lucide-icons";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import type { CheckboxProps, SizeTokens } from "tamagui";
import { Checkbox, Label, XStack, YStack } from "tamagui";
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
