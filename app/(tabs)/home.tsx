import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text, View } from "react-native";

export default function HomePage() {
  return (
    <View>
      <Pressable onPress={() => AsyncStorage.removeItem("@userId")}>
        <Text style={{ backgroundColor: "blue" }}> log out </Text>
      </Pressable>
    </View>
  );
}
