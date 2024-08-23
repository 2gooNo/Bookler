import { Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/common";

export function PostLikes({ item }: any) {
  const { userData } = useContext(AuthContext);
  const [interacted, setInteracted] = useState<number>(0);

  const Vote = async (likeType: number) => {
    item?.likes.forEach(async (like: any) => {
      if (
        like?.data?.likedBy == userData?.userId &&
        like?.data?.type == likeType
      ) {
        const docRef = doc(db, "posts", item?.post?.[1], "likes", like?.id);
        await deleteDoc(docRef);
        setInteracted(0);
      } else if (
        like?.data?.likedBy == userData?.userId &&
        like?.data?.type !== likeType
      ) {
        const docRef = doc(db, "posts", item?.post?.[1], "likes", like?.id);
        await updateDoc(docRef, {
          type: likeType,
        });
      } else if (like?.data?.likedBy !== userData?.userId) {
        const docData = {
          likedBy: userData?.userId,
          type: likeType,
        };

        const commentCollectionRef = collection(
          doc(db, "posts", item?.post?.[1]),
          "likes"
        );
        await addDoc(commentCollectionRef, docData);
      }
    });
    if (!item?.likes[0]) {
      const docData = {
        likedBy: userData?.userId,
        type: likeType,
      };

      const commentCollectionRef = collection(
        doc(db, "posts", item?.post?.[1]),
        "likes"
      );
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
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "blue",
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 50,
        alignItems: "center",
        gap: 7,
      }}
    >
      <Pressable onPress={() => Vote(1)}>
        <FontAwesome
          name="arrow-up"
          size={20}
          color={interacted == 1 ? "red" : "white"}
        />
      </Pressable>
      <Text style={{ color: "white" }}>
        {item?.likes?.reduce(
          (total: number, like: any) => total + (like?.data?.type || 0),
          0
        )}
      </Text>
      <Pressable onPress={() => Vote(-1)}>
        <FontAwesome
          name="arrow-down"
          size={20}
          color={interacted == -1 ? "red" : "white"}
        />
      </Pressable>
    </View>
  );
}
