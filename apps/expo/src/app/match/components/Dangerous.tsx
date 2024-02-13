import { View } from "react-native";
import ActionButton from "./ActionButton";

export default function Dangerous() {
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
        action={() => console.log("DC")}
        label="Disconnected"
        theme={"red"}
      />
      <ActionButton
        action={() => console.log("Tippy lol")}
        label="Tipped Over"
        theme={"red"}
      />
    </View>
  );
}
