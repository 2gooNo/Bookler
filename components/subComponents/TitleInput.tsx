import { PostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";

export function TitleInput() {
  const { setTitle, title } = useContext(PostContext);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <TextInput
        value={title}
        placeholder="Title"
        onChangeText={(e) => setTitle(e)}
      ></TextInput>
    </TouchableWithoutFeedback>
  );
}
