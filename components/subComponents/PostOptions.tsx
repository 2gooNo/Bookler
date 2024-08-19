import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Platform, Pressable, Text, View } from "react-native";
import { auth, db } from "@/common";
import { useContext } from "react";
import { PostContext } from "@/context/postContext";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Clipboard from "expo-clipboard";

export function PostOptions() {
  const { currentPostData } = useContext(PostContext);
  console.log(currentPostData);
  const deletePost = async () => {
    const documentRef = doc(db, "posts", currentPostData?.post?.[1]);
    await deleteSubcollections(documentRef);
    // await deleteDoc(documentRef);
  };
  async function deleteSubcollections(docRef: any) {
    const subcollections = await docRef.listCollections();
    for (const subcollection of subcollections) {
      const querySnapshot = await getDocs(subcollection);
      for (const subDoc of querySnapshot.docs) {
        console.log(subDoc.ref);
        // await deleteSubcollections(subDoc.ref);
        // await deleteDoc(subDoc.ref);
      }
    }
  }
  const savePost = async () => {};
  const blockUser = async () => {};
  const copyText = async () => {
    await Clipboard.setStringAsync(currentPostData?.post?.bodyText);
  };
  return (
    // <BottomSheetView>
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
    // </BottomSheetView>
  );
}
