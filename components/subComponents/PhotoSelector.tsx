import { Button, Image, Pressable, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useContext } from "react";
import { CreatePostContext } from "@/context/createPostContext";
import AntDesign from "@expo/vector-icons/AntDesign";

export function PhotoSelector() {
  const { setMedia } = useContext(CreatePostContext);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      // aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      result?.assets.forEach((image) => {
        setMedia((prev) => [...prev, image.uri]);
      });
    }
  };
  return (
    <Pressable onPress={() => pickImage()}>
      <AntDesign name="picture" size={26} color="white" />
    </Pressable>
  );
}
