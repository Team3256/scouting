import React from "react";
import { View, Text } from "react-native";
import { Button, YStack } from "tamagui";
import { Undo2 } from "@tamagui/lucide-icons";
import ActionButton from "./ActionButton";
// [Index, Timestamp]
export type History = [number, number][];

// Define a type for themeOverrides

type ThemeOverrides =
  | ((key: string) => string | undefined)
  | Record<string, string>
  | string[];

export default function ActionGrid({
  actions,
  history,
  setHistory,
  themeOverrides,
  indexOverrides,
  hideUndo,
}: {
  actions: string[];
  history: History;
  setHistory: (history: History) => void;
  themeOverrides?: ThemeOverrides;
  indexOverrides?: Record<number, number>;
  hideUndo?: boolean;
}) {
  const undoLastAction = () => {
    if (history.length > 0) {
      setHistory(history.slice(0, history.length - 1));
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <YStack space="$4">
        {!hideUndo && (
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
        )}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {actions.map((label, index) => {
            const finalIndex = indexOverrides
              ? indexOverrides[index] ?? index
              : index;
            return (
              <View
                key={label}
                style={{
                  width: "48%", // Slightly less than half to account for margins
                  marginVertical: 5,
                }}
              >
                <ActionButton
                  label={`${label} (${
                    history.filter(([i]) => i === finalIndex).length
                  })`}
                  action={() =>
                    setHistory([...history, [finalIndex, Date.now()]])
                  }
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
            );
          })}
        </View>
      </YStack>
    </View>
  );
}
