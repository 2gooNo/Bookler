import { CreatePostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";

export function BodyTextInput() {
  const { setBodyText, bodyText } = useContext(CreatePostContext);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <TextInput
        value={bodyText}
        multiline={true}
        placeholderTextColor={"#adabaa"}
        textAlignVertical="top"
        style={{
          paddingHorizontal: 10,
          fontSize: 15,
          color: "white",
        }}
        placeholder="Body text"
        onChangeText={(e) => setBodyText(e)}
      ></TextInput>
    </TouchableWithoutFeedback>
  );
}
