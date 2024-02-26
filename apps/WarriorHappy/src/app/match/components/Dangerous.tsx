import { View } from "react-native";

import { UltimateHistory } from "../types";
import ActionButton from "./ActionButton";

export default function Dangerous({
  setUltimateHistory,
  ultimateHistory,
}: {
  setUltimateHistory: (history: UltimateHistory) => void;
  ultimateHistory: UltimateHistory;
}) {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: "auto",
        marginBottom: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      className="space-x-2"
    >
      <ActionButton
        action={() => {
          setUltimateHistory({
            ...ultimateHistory,
            log: [...ultimateHistory.log, "DISCONNECTED"],
          } as UltimateHistory);
        }}
        label="Disconnected"
        theme={"red"}
      />
      <ActionButton
        action={() => {
          setUltimateHistory({
            ...ultimateHistory,
            log: [...ultimateHistory.log, "TIPP"],
          } as UltimateHistory);
        }}
        label="Tipped Over"
        theme={"red"}
      />
    </View>
  );
}
