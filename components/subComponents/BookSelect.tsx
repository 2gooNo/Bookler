import { CreatePostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { View } from "react-native";

export function BookSelect() {
  const { setSelectedBook } = useContext(CreatePostContext);
  return <View></View>;
}
