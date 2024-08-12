import { Text, View } from "react-native";

export function PostCard({ item }: { item: any }) {
  return (
    <View>
      <Text style={{ color: "white" }}>{item?.post?.[0]?.title || ""}</Text>
    </View>
  );
}
