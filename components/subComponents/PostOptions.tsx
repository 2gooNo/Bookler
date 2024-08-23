import { Pressable, Text, View, StyleSheet } from "react-native";
import { auth, db } from "@/common";
import { useContext } from "react";
import { PostContext } from "@/context/postContext";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Clipboard from "expo-clipboard";

export function PostOptions() {
  const { currentPostData } = useContext(PostContext);
  const deletePost = async () => {
    const documentRef = doc(db, "posts", currentPostData?.post?.[1]);

    const subcollectionNames = ["comments", "likes"];
    for (const subcollectionName of subcollectionNames) {
      const subcollectionRef = collection(documentRef, subcollectionName);
      const snapshot = await getDocs(subcollectionRef);
      const batch = writeBatch(db);
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }
    await deleteDoc(documentRef);
  };

  const savePost = async () => {
    if (auth?.currentUser?.uid && currentPostData?.post?.[1]) {
      const d = doc(db, "users", auth?.currentUser?.uid);
      await updateDoc(d, {
        favorites: arrayUnion(currentPostData?.post?.[1]),
      });
    }
  };
  const blockUser = async () => {
    if (auth?.currentUser?.uid && currentPostData?.user?.userId) {
      const d = doc(db, "users", auth?.currentUser?.uid);
      await updateDoc(d, {
        blockedUsers: arrayUnion(currentPostData?.user?.userId),
      });
    }
  };
  const copyText = async () => {
    await Clipboard.setStringAsync(currentPostData?.post?.bodyText);
  };
  return (
    <View style={{ flex: 1, gap: 20, padding: 10 }}>
      <Pressable onPress={() => copyText()} style={styles.pressable}>
        <FontAwesome5 name="clipboard" size={24} color="#dedcdb" />
        <Text style={{ color: "#dedcdb", fontSize: 18 }}>Copy text</Text>
      </Pressable>

      {auth?.currentUser?.uid !== currentPostData?.user?.userId && (
        <Pressable onPress={() => savePost()} style={styles.pressable}>
          <FontAwesome name="bookmark-o" size={24} color="#dedcdb" />
          <FontAwesome name="bookmark" size={24} color="#dedcdb" />
          <Text style={{ color: "#dedcdb", fontSize: 18 }}>Save post</Text>
        </Pressable>
      )}

      {auth?.currentUser?.uid !== currentPostData?.user?.userId && (
        <Pressable onPress={() => blockUser()} style={styles.pressable}>
          <FontAwesome name="remove" size={24} color="#ff4e0e" />
          <Text style={{ color: "#ff4e0e", fontSize: 18 }}>Block user</Text>
        </Pressable>
      )}

      {auth?.currentUser?.uid == currentPostData?.user?.userId && (
        <Pressable onPress={() => deletePost()} style={styles.pressable}>
          <FontAwesome name="trash-o" size={24} color="#ff4e0e" />
          <Text style={{ color: "#ff4e0e", fontSize: 18 }}>Delete</Text>
        </Pressable>
      )}

      {auth?.currentUser?.uid == currentPostData?.user?.userId && (
        <Pressable style={styles.pressable}>
          <FontAwesome name="pencil-square-o" size={24} color="#dedcdb" />
          <Text style={{ color: "#dedcdb", fontSize: 18 }}>Edit</Text>
        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
