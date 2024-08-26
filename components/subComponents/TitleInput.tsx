import { CreatePostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";

export function TitleInput() {
  const { setTitle, title } = useContext(CreatePostContext);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <TextInput
        value={title}
        placeholderTextColor={"#adabaa"}
        placeholder="Гарчиг"
        onChangeText={(e) => setTitle(e)}
        multiline={true}
        textAlignVertical="top"
        style={{
          // backgroundColor: "yellow",
          paddingHorizontal: 10,
          fontSize: 25,
          color: "white",
          fontWeight: "bold",
        }}
        // keyboardType=""
      ></TextInput>
    </TouchableWithoutFeedback>
  );
}
