import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

export function ProfileFollow({ userId, otherUser }: any) {
  const { userData } = useContext(AuthContext);
  const FollowUser = async () => {
    const d = doc(db, "users", userData.userId);
    await updateDoc(d, {
      following: arrayUnion(userId),
    });
  };
  const UnfollowUser = async () => {
    const d = doc(db, "users", userData.userId);
    await updateDoc(d, {
      following: arrayRemove(userId),
    });
  };
  return (
    <View style={{ flex: 1 }}>
      {userData?.following.includes(userId) &&
        !otherUser?.following.includes(userId) && (
          <Pressable onPress={() => UnfollowUser()}>
            <Text style={styles.text}>UnFollow</Text>
          </Pressable>
        )}
      {!userData?.following.includes(userId) &&
        otherUser?.following.includes(userId) && (
          <Pressable onPress={() => FollowUser()}>
            <Text style={styles.text}>Follow back</Text>
          </Pressable>
        )}
      {userData?.following.includes(userId) &&
        otherUser?.following.includes(userId) && (
          <Pressable onPress={() => UnfollowUser()}>
            <Text style={styles.text}>Mutuals</Text>
          </Pressable>
        )}
      {!userData?.following.includes(userId) &&
        !otherUser?.following.includes(userId) && (
          <Pressable onPress={() => FollowUser()}>
            <Text style={styles.text}>Follow</Text>
          </Pressable>
        )}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
  },
  text: {
    color: "white",
    fontSize: 17,
  },
});
