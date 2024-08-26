import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { addDoc, collection, doc } from "firebase/firestore";
import { useContext } from "react";
import { Pressable } from "react-native";

export function RepostButton({ post }: any) {
  const { userData } = useContext(AuthContext);
  const repost = async () => {
    const docRef = await addDoc(collection(db, "posts"), {
      userId: userData.uid,
      userRef: doc(db, "users", userData.uid),
      repostId: post?.post?.[1],
    });
  };
  return (
    <Pressable onPress={() => repost()}>
      <FontAwesome name="share-square-o" size={20} color="white" />
    </Pressable>
  );
}
