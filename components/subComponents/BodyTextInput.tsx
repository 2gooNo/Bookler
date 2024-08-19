import { CreatePostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";

export function BodyTextInput() {
  const { setBodyText, bodyText } = useContext(CreatePostContext);
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
