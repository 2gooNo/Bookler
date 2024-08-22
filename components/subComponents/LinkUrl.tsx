import { CreatePostContext } from "@/context/createPostContext";
import { useContext, useState } from "react";
import {
  Pressable,
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const { height, width } = Dimensions.get("window");

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
    <View style={styles.outerComponent}>
      <TextInput
        value={localUrl}
        onChangeText={(text) => handleChangeText(text)}
        keyboardType="url"
        placeholder="Add a link URL ... "
        style={styles.input}
      />
      <Text style={{ display: errorMessage ? "flex" : "none", color: "white" }}>
        {errorMessage ? errorMessage : ""}
      </Text>
      <Pressable onPress={() => setLinkComponent(false)} style={styles.delete}>
        <FontAwesome6 name="x" size={15} color="black" />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  outerComponent: {
    position: "relative",
    // backgroundColor: "orange",
    alignItems: "center",
    paddingVertical: 10,
  },
  delete: {
    position: "absolute",
    right: width * 0.01,
    backgroundColor: "white",
    // width: width * 0.05,
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "95%",
    borderRadius: 5,
  },
});
