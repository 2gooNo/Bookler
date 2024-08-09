import { Button, Image, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { PostContext } from "@/context/createPostContext";

export function PhotoSelector() {
  const { setMedia } = useContext(PostContext);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      // aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result?.assets);
      result?.assets.forEach((image) => {
        console.log(image);
        setMedia((prev) => [...prev, image.uri]);
      });
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  image: {
    color: "yellow",
    width: 200,
    height: 200,
  },
});
