import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Plus } from "@tamagui/lucide-icons";
import { Button } from "tamagui";
import { createTamagui, createTokens } from "tamagui";

export default function ActionButton({
  label,
  action,
  theme,
}: {
  label: string;
  action: () => void;
  theme?: string;
}) {
  const tokens = createTokens({
    color: {
      black: "#000",

      white: "#fff",
    },
  });

  const dark = {
    background: tokens.color.black,

    color: tokens.color.white,
  };

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
        // height: "22%",
        // flexWrap: "wrap",
        // flexShrink: 1,
        // flex: 1,
        // overflow: hidden;
        // "text-overflow": "ellipsis",
        // "word-wrap": "break-word",
        // display: "block",
        // "line-height": "1em" /* a */,
        // "max-height": "2em" /* a x number of line to show (ex : 2 line)  */,
      }}
      // alignSelf="center"
      // cla
      // noTextWrap={true}
      // fontSize={"}
      // theme=  "active"
    >
      {label}
    </Button>
  );
}
