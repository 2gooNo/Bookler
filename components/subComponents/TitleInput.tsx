import { PostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { TextInput } from "react-native";

export function TitleInput() {
  const { setTitle, title } = useContext(PostContext);
  return (
    <TextInput
      value={title}
      placeholder="Title"
      onChangeText={(e) => setTitle(e)}
    ></TextInput>
  );
}
