import { Text, View } from "react-native";
import { XStack } from "tamagui";

import ActionButton from "./components/ActionButton";
import ActionGrid from "./components/ActionGrid";

export default function Teleop() {
  const intakeActions = [
    "Human",
    "Ground",
    // "Climb",
    // "Shoot Amp",
    // "Miss Speaker",
    // "Miss Amp",
    // "Intake Ground",📢
    // "Contact with Bot",
  ];
  const shooterActions = ["Speaker", "Amp", "Miss S📢", "Miss Amp"];
  return (
    <View>
      <Text className="pl-3 text-lg">Intake</Text>
      <ActionGrid
        actions={intakeActions}
        onHistoryChanged={(label) => console.log(label)}
      />
      <Text className="pl-3 text-lg">Scoring (Speaker = 📢, Amp = 🔊)</Text>
      <ActionGrid
        actions={shooterActions}
        onHistoryChanged={(label) => console.log(label)}
        themeOverrides={["green", "green", "red", "red"]}
      />
    </View>
  );
}
