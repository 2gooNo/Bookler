import { Dimensions, Image, Pressable, Text, View } from "react-native";

const { height, width } = Dimensions.get("window");

export function CommentCard({ setReplyTo, comment }: any) {
  console.log(comment, ":)");
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: comment?.user?.photoUrl }}
          style={{ height: height * 0.01, width: width * 0.04 }}
        />
        <Text>
          {comment?.user ? comment?.user?.userName : "User Unavailable"}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Pressable
          onPress={() =>
            setReplyTo({
              id: comment?.post?.[1],
              userName: comment?.user?.userName,
            })
          }
        >
          <Text>reply</Text>
        </Pressable>
      </View>
    </View>
  );
}
