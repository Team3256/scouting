import { Text, View } from "react-native";
import {
  Button,
  H5,
  isWeb,
  Separator,
  SizableText,
  Tabs,
  TabsContentProps,
  XStack,
  YStack,
} from "tamagui";

import Auto from "./Auto";
import Endgame from "./Endgame";
import Teleop from "./Teleop";
import { SafeAreaView } from "react-native-safe-area-context";
import Dangerous from "./components/Dangerous";

export default function Match() {
  return (
    <SafeAreaView className="h-full bg-slate-700">
      <Tabs defaultValue="tab1" flexDirection="column">
        <Tabs.List gap>
          <Tabs.Tab value="tab1">
            <SizableText>Auto</SizableText>
          </Tabs.Tab>

          <Tabs.Tab value="tab2">
            <SizableText>Teleop</SizableText>
          </Tabs.Tab>
          <Tabs.Tab value="tab3">
            <SizableText>Endgame</SizableText>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Content value="tab1" height={"100%"} paddingBottom="15%">
          <Auto />
          <Dangerous />
        </Tabs.Content>

        <Tabs.Content value="tab2" height={"100%"} paddingBottom="15%">
          <Teleop />
          <Dangerous />
        </Tabs.Content>
        <Tabs.Content value="tab3" height={"100%"} paddingBottom="15%">
          <Endgame />
          <Dangerous />
        </Tabs.Content>
      </Tabs>
    </SafeAreaView>
  );
}
