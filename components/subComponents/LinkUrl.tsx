import { CreatePostContext } from "@/context/createPostContext";
import { useContext, useState } from "react";
import { Pressable, Text, View, TextInput } from "react-native";

export function LinkUrl() {
  const { linkUrl, setLinkUrl, setLinkComponent } =
    useContext(CreatePostContext);
  const [localUrl, setLocalUrl] = useState(linkUrl);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const isValidURL = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChangeText = (text: string) => {
    if (isValidURL(text) || text === "") {
      setLocalUrl(text);
      setLinkUrl(text);
    } else {
      setErrorMessage("Invalid URL , Please enter a valid URL");
    }
  };

  return (
    <View>
      <TextInput
        value={localUrl}
        onChangeText={(text) => handleChangeText(text)}
        keyboardType="url"
        placeholder="Add a link URL ... "
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          paddingHorizontal: 10,
        }}
      />
      <Text style={{ display: errorMessage ? "flex" : "none", color: "white" }}>
        {errorMessage ? errorMessage : ""}
      </Text>
      <Pressable onPress={() => setLinkComponent(false)}>
        <Text style={{ color: "white" }}>X</Text>
      </Pressable>
    </View>
  );
}
