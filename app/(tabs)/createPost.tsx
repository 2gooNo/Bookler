import { CreatePostButton } from "@/components/subComponents/CreatePostButton";
import HashTagSelect from "@/components/subComponents/HashTagSelect";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function CreatePost() {
  return (
    <View style={{ paddingVertical: "30%" }}>
      <Pressable
        onPress={() => router.push("./home")}
        style={{ backgroundColor: "purple" }}
      >
        <Text style={{ color: "white" }}>Go back</Text>
      </Pressable>
      <CreatePostButton />
      <HashTagSelect />
    </View>
  );
}
