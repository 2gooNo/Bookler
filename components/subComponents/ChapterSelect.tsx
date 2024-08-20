import { CreatePostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { View } from "react-native";
import { CreatePostButton } from "./CreatePostButton";
import { CreateDraftButton } from "./CreateDraftButton";

export function ChapterSelect() {
  const { setSelectedChapter } = useContext(CreatePostContext);
  return (
    <View>
      <CreatePostButton />
      <CreateDraftButton />
    </View>
  );
}
