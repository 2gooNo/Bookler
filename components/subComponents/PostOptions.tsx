import { Pressable, Text, View } from "react-native";
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
  console.log(currentPostData);
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
    <View style={{ backgroundColor: "pink", flex: 1 }}>
      <Pressable onPress={() => copyText()} style={{ flexDirection: "row" }}>
        <FontAwesome5 name="clipboard" size={24} color="black" />
        <Text style={{ color: "black" }}>Copy text</Text>
      </Pressable>

      {auth?.currentUser?.uid !== currentPostData?.user?.userId && (
        <Pressable onPress={() => savePost()} style={{ flexDirection: "row" }}>
          <FontAwesome name="bookmark-o" size={24} color="black" />
          <FontAwesome name="bookmark" size={24} color="black" />
          <Text style={{ color: "black" }}>Save post</Text>
        </Pressable>
      )}

      {auth?.currentUser?.uid !== currentPostData?.user?.userId && (
        <Pressable onPress={() => blockUser()} style={{ flexDirection: "row" }}>
          <FontAwesome name="remove" size={24} color="red" />
          <Text style={{ color: "red" }}>Block user</Text>
        </Pressable>
      )}

      {auth?.currentUser?.uid == currentPostData?.user?.userId && (
        <Pressable
          onPress={() => deletePost()}
          style={{ flexDirection: "row" }}
        >
          <FontAwesome name="trash-o" size={24} color="red" />
          <Text style={{ color: "red" }}>Delete</Text>
        </Pressable>
      )}

      {auth?.currentUser?.uid == currentPostData?.user?.userId && (
        <Pressable
          onPress={() => console.log("edit post")}
          style={{ flexDirection: "row" }}
        >
          <FontAwesome name="pencil-square-o" size={24} color="black" />
          <Text style={{ color: "black" }}>Edit</Text>
        </Pressable>
      )}
    </View>
  );
}
