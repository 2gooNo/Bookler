import { PostContext } from "@/context/postContext";
import { useContext } from "react";
import { View } from "react-native";

export function CommentPage() {
  const { currentPostData } = useContext(PostContext);
  return <View></View>;
}
