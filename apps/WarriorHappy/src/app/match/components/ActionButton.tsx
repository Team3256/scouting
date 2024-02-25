import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Plus } from "@tamagui/lucide-icons";
import { Button, createTamagui, createTokens } from "tamagui";

export default function ActionButton({
  label,
  action,
  theme,
}: {
  label: string;
  action: () => void;
  theme?: string;
}) {
  // const tokens = createTokens({
  //   color: {
  //     black: "#000",

  //     white: "#fff",
  //   },
  // });

  // const dark = {
  //   background: tokens.color.black,

  //   color: tokens.color.white,
  // };

  //https://tamagui.dev/docs/intro/themes
  return (
    <Button
      theme={theme ?? "active"}
      icon={Plus}
      onPress={action}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "start",
        // boxShadow: "inherit",
      }}
    >
      {label}
    </Button>
  );
}
