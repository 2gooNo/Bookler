import { db } from "@/common";
import { PostContext } from "@/context/postContext";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";

export default function CommentPage() {
  const { postId } = useLocalSearchParams();
  const { currentPostData } = useContext(PostContext);
  const [comments, setComments] = useState<any[]>([]);
  console.log(postId);
  useEffect(() => {
    getComments();
  }, []);
  const getComments = async () => {
    if (postId == "") {
      const q = query(collection(db, "posts", postId, "comments"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data(), "comments");
        setComments((prev: any) => [...prev, [doc.data(), doc.id]]);
      });
    }
  };
  return (
    <View>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row" }}></View>
      </View>
    </View>
  );
}
