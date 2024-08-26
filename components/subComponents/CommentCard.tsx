import { router } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from "react-native";
import { CommentLikes } from "./CommentLike";

const { height, width } = Dimensions.get("window");

export function CommentCard({
  setReplyTo,
  comment,
  textInputField,
  postId,
}: any) {
  return (
    <View style={styles.mainBody}>
      <Pressable
        onPress={() => {
          router.navigate(`../otherProfile/${comment?.user?.userId}`);
        }}
      >
        <Image
          source={{ uri: comment?.user?.photoUrl }}
          style={{
            height: height * 0.04,
            width: width * 0.08,
            borderRadius: 45,
          }}
        />
      </Pressable>
      <View style={{ flexDirection: "column", width: width * 0.83 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text style={styles.commentUser}>
            {comment?.user ? comment?.user?.userName : "User Unavailable"}
          </Text>
        </View>
        <Text style={styles.commentText}>
          {comment?.comment?.[0]?.bodyText}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            // paddingBottom: 6,
            // backgroundColor: "pink",
          }}
        >
          <Pressable
            onPress={() => {
              setReplyTo({
                id: comment?.comment?.[1],
                userName: comment?.user?.userName,
              });
              textInputField?.current.focus();
            }}
          >
            <Text style={{ color: "grey" }}>хариулах</Text>
          </Pressable>
          <CommentLikes item={comment} postId={postId} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flexDirection: "row",
    backgroundColor: "#202020",
    padding: 10,
    gap: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    paddingVertical: 20,
    //
  },
  commentText: {
    color: "white",
    fontSize: 15,
  },
  commentUser: {
    color: "grey",
    fontWeight: "500",
    fontSize: 13,
  },
});
