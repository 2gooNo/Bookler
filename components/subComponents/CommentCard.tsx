import { Image, Pressable, Text, View } from "react-native";

export function CommentCard({ setReplyTo, comment }: any) {
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row" }}>
        <Image />
        <Text>tugriogj</Text>
        <Pressable onPress={() => console.log("0")}></Pressable>
      </View>
    </View>
  );
}
