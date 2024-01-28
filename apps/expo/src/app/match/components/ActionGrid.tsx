import type { CheckboxProps, SizeTokens } from "tamagui";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  ArrowLeftCircle,
  Check as CheckIcon,
  Plus,
  Undo2,
} from "@tamagui/lucide-icons";
import { Button, Checkbox, Label, XStack, YStack } from "tamagui";

import ActionButton from "./ActionButton";

export type History = [string, number][];
export default function ActionGrid({
  actions,
  onHistoryChanged,
  themeOverrides,
}: {
  actions: string[];
  onHistoryChanged: (history: History) => void;
  themeOverrides?:
    | ((key: string) => string | undefined)
    | Record<string, string>
    | string[];
}) {
  // Array of [action index, timestamp]
  const [history, setHistory] = useState<[number, number][]>([]);
  const cachedOnHistoryChanged = useCallback(() => {
    onHistoryChanged(
      history.map(([index, timestamp]) => [actions[index], timestamp]),
    );
  }, [onHistoryChanged, actions, history]);
  useEffect(() => {
    cachedOnHistoryChanged(history);
  }, [history, cachedOnHistoryChanged]);

  const handleAction = (index: number) => {
    setHistory((history) => [...history, [index, Date.now()]]);
    console.log("Action performed:", actions[index]);
  };
  const undoLastAction = () => {
    if (history.length > 0) {
      setHistory((history) => history.slice(0, history.length - 1));
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <YStack space="$4">
        <Button
          disabled={history.length === 0}
          onPress={undoLastAction}
          style={{
            marginRight: 0,
            marginLeft: "auto",
            opacity: history.length === 0 ? 0.3 : 1,
            // opacity: 1,
          }}
          icon={Undo2}
          theme="red"
        >
          <Text className="text-red-900">Undo</Text>
        </Button>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {actions.map((label, index) => (
            <View
              key={label}
              style={{
                width: "48%", // Slightly less than half to account for margins
                marginVertical: 5,
              }}
            >
              <ActionButton
                label={`${label} (${
                  history.filter(([i]) => i === index).length
                })`}
                action={() => handleAction(index)}
                theme={
                  themeOverrides
                    ? Array.isArray(themeOverrides)
                      ? themeOverrides[index]
                      : typeof themeOverrides === "function"
                        ? themeOverrides(label)
                        : themeOverrides[label]
                    : undefined
                }
              />
            </View>
          ))}
        </View>
      </YStack>
    </View>
  );
}
