import type { CheckboxProps, SizeTokens } from "tamagui";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  ArrowLeftCircle,
  Check as CheckIcon,
  Plus,
} from "@tamagui/lucide-icons";
import { Button, Checkbox, Label, XStack, YStack } from "tamagui";
import { Check } from "@tamagui/lucide-icons";

export default function CheckboxWithLabel({
  size,
  label,
  ...props
}: CheckboxProps & { size: SizeTokens; label?: string }) {
  return (
    <XStack width={500} alignItems="center" space="$4">
      <Checkbox size={size} {...props}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>

      <Label size={size}>
        <Text className="ml-2 p-2 text-lg font-bold text-red-400">{label}</Text>
      </Label>
    </XStack>
  );
}
