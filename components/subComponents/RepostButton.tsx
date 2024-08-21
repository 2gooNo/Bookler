import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";
export function RepostButton() {
  return (
    <Pressable onPress={() => console.log("funct")}>
      <FontAwesome name="share-square-o" size={20} color="white" />
    </Pressable>
  );
}
