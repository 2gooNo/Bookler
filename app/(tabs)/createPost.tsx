import { CreatePostButton } from "@/components/subComponents/CreatePostButton";
import HashTagSelect from "@/components/subComponents/HashTagSelect";
import { View } from "react-native";

export default function CreatePost() {
  return (
    <View style={{ paddingVertical: "30%" }}>
      <CreatePostButton />
      <HashTagSelect />
    </View>
  );
}
