import { PostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";

export function BodyTextInput() {
  const { setBodyText, bodyText } = useContext(PostContext);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <TextInput
        value={bodyText}
        placeholder="Body"
        onChangeText={(e) => setBodyText(e)}
      ></TextInput>
    </TouchableWithoutFeedback>
  );
}
