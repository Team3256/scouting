import type { CheckboxProps, SizeTokens } from "tamagui";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  ArrowLeftCircle,
  Check as CheckIcon,
  Plus,
} from "@tamagui/lucide-icons";
import { Button, Checkbox, Label, XStack, YStack } from "tamagui";

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
