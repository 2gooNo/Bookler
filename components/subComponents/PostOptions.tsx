import { Pressable, Text, View, StyleSheet } from "react-native";
import { auth, db } from "@/common";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "@/context/postContext";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Clipboard from "expo-clipboard";
import { AuthContext } from "@/context/authContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export function PostOptions() {
  const { userData } = useContext(AuthContext);
  const { currentPostData } = useContext(PostContext);
  const [copied, setCopied] = useState(false);
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
  const unSave = async () => {
    if (auth?.currentUser?.uid && currentPostData?.post?.[1]) {
      const d = doc(db, "users", auth?.currentUser?.uid);
      await updateDoc(d, {
        favorites: arrayRemove(currentPostData?.post?.[1]),
      });
    }
  };
  const blockUser = async () => {
    if (auth?.currentUser?.uid && currentPostData?.user?.userId) {
      const d = doc(db, "users", auth?.currentUser?.uid);
      await updateDoc(d, {
        blockedUsers: arrayUnion(currentPostData?.user?.userId),
      });
      const docFriend = doc(db, "users", auth?.currentUser?.uid);
      await updateDoc(docFriend, {
        following: arrayRemove(currentPostData?.user?.userId),
      });
    }
  };
  const copyText = async () => {
    setCopied(true);
    await Clipboard.setStringAsync(currentPostData?.post?.bodyText);
    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <View style={{ flex: 1, gap: 20, padding: 10 }}>
      <Pressable
        onPress={() => {
          copyText();
        }}
        style={styles.pressable}
      >
        {copied ? (
          <FontAwesome6 name="clipboard-check" size={24} color="#dedcdb" />
        ) : (
          <FontAwesome5 name="clipboard" size={24} color="#dedcdb" />
        )}

        {copied ? (
          <Text style={{ color: "#dedcdb", fontSize: 18 }}>Copied</Text>
        ) : (
          <Text style={{ color: "#dedcdb", fontSize: 18 }}>Copy text</Text>
        )}
      </Pressable>

      {auth?.currentUser?.uid !== currentPostData?.user?.userId &&
      userData?.favorites.includes(currentPostData?.post?.[1]) ? (
        <Pressable onPress={() => unSave()} style={styles.pressable}>
          <FontAwesome name="bookmark" size={24} color="#dedcdb" />
          <Text style={{ color: "#dedcdb", fontSize: 18 }}>Unsave post</Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => savePost()} style={styles.pressable}>
          <FontAwesome name="bookmark-o" size={24} color="#dedcdb" />
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
          <Text style={{ color: "#dedcdb", fontSize: 18 }}>Засварлах</Text>
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
