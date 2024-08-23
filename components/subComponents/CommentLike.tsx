import { Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/common";

export function CommentLikes({ item, postId }: any) {
  const { userData } = useContext(AuthContext);
  const [interacted, setInteracted] = useState<number>(0);

  const Vote = async (likeType: number) => {
    let hasLiked = false;
    for (const like of item?.likes || []) {
      if (like?.data?.likedBy === userData?.userId) {
        hasLiked = true;
        if (like?.data?.type === likeType) {
          const docRef = doc(
            db,
            "posts",
            postId,
            "comments",
            item?.comment?.[1],
            "likes",
            like?.id
          );
          await deleteDoc(docRef);
          setInteracted(0);
        } else {
          const docRef = doc(
            db,
            "posts",
            postId,
            "comments",
            item?.comment?.[1],
            "likes",
            like?.id
          );
          await updateDoc(docRef, { type: likeType });
          setInteracted(likeType);
        }
        return;
      }
    }
    if (!hasLiked) {
      const docData = {
        likedBy: userData?.userId,
        type: likeType,
      };
      const commentCollectionRef = collection(
        doc(db, "posts", postId),
        "comments",
        item?.comment?.[1],
        "likes"
      );
      setInteracted(likeType);
      await addDoc(commentCollectionRef, docData);
    }
  };

  useEffect(() => {
    if (item) {
      item?.likes.forEach((like: any) => {
        if (like?.data?.likedBy == userData.userId && like?.data?.type) {
          setInteracted(like?.data?.type);
        } else {
          setInteracted(0);
        }
      });
    }
  }, [item]);

  if (!item) {
    return;
  }
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "transparent",
        // paddingVertical: 3,
        // paddingHorizontal: 10,

        alignItems: "center",
        gap: 7,
        // borderColor: "white",
        // borderWidth: 0.5,
      }}
    >
      <Pressable onPress={() => Vote(1)}>
        <FontAwesome
          name="arrow-up"
          size={15}
          color={interacted == 1 ? "orange" : "white"}
        />
      </Pressable>
      <Text style={{ color: "white" }}>
        {item?.likes?.reduce(
          (total: number, like: any) => total + like?.data?.type,
          0
        )}
      </Text>
      <Pressable onPress={() => Vote(-1)}>
        <FontAwesome
          name="arrow-down"
          size={15}
          color={interacted == -1 ? "#1DA1F2" : "white"}
        />
      </Pressable>
    </View>
  );
}
