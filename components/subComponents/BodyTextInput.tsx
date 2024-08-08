import { PostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { TextInput } from "react-native";

export function BodyTextInput() {
  const { setBodyText, bodyText } = useContext(PostContext);
  return (
    <TextInput
      value={bodyText}
      placeholder="Body"
      onChangeText={(e) => setBodyText(e)}
    ></TextInput>
  );
}
