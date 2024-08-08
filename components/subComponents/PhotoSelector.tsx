import { Button, Image, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export function PhotoSelector() {
  const [image, setImage] = useState<string | null | undefined>(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result?.assets?.[0]?.uri);
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    color: "yellow",
    width: 200,
    height: 200,
  },
});
