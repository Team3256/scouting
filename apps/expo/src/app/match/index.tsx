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

export default function matchPage() {
  return (
    <Tabs>
      <Tabs.List space>
        <Tabs.Tab value="tab1">
          <SizableText>Tab 1</SizableText>
        </Tabs.Tab>

        <Tabs.Tab value="tab2">
          <SizableText>Tab 2</SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <H5>Tab 1</H5>
      </Tabs.Content>

      <Tabs.Content value="tab2">
        <H5>Tab 2</H5>
      </Tabs.Content>
    </Tabs>
  );
}
