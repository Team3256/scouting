import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "tamagui";
import { Plus, ArrowLeftCircle } from "@tamagui/lucide-icons";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import type { CheckboxProps, SizeTokens } from "tamagui";
import { Checkbox, Label, XStack, YStack } from "tamagui";

export default function CheckboxWithLabel({
  size,
  label,
}: CheckboxProps & { size: SizeTokens; label?: string }) {
  return (
    <XStack width={300} alignItems="center" space="$4">
      <Checkbox size={size}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>

      <Label size={size}>
        {/* <Text className="ml-2 p-2 text-lg font-bold text-red-400">Teesstt</Text> */}
      </Label>
    </XStack>
  );
}

/*
export function CheckboxWithLabel({
  size,
  label = "Gained Mobility",
  ...checkboxProps
}: CheckboxProps & { size: SizeTokens; label?: string }) {
  return (
    <XStack width={300} alignItems="center" space="$4">
      <Checkbox size={size} {...checkboxProps}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>

      <Label size={size}>
        <Text className="ml-2 p-2 text-lg font-bold text-blue-400">
          {label}
        </Text>
      </Label>
    </XStack>
  );
}
*/
