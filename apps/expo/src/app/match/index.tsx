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

export default function Match() {
  return (
    <View>
      <Tabs flexDirection="column">
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

        <Tabs.Content value="tab1">
          <Auto />
        </Tabs.Content>

        <Tabs.Content value="tab2">
          <Teleop />
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <Endgame />
        </Tabs.Content>
      </Tabs>
    </View>
  );
}
