import { PostContext } from "@/context/createPostContext";
import { Video } from "expo-av";
import { useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

export function PhotoConfirm({ navigation }: { navigation: any }) {
  const { takenMedia, setTakenMedia, setImages } = useContext(PostContext);
  console.log(takenMedia);
  return (
    <View>
      <Pressable
        style={{ backgroundColor: "yellow", height: 100, width: 100 }}
        onPress={() => {
          navigation.navigate("Camera");
          setTakenMedia("");
        }}
      >
        <Text style={{ color: "black" }}>Take a dif phto</Text>
      </Pressable>
      <Pressable
        style={{ backgroundColor: "green", height: 100, width: 100 }}
        onPress={() => {
          navigation.navigate("CreatePost");
          setImages((prev) => [...prev, takenMedia]);
          MediaLibrary.createAssetAsync(takenMedia);
          setTakenMedia("");
        }}
      >
        <Text style={{ color: "black" }}>confirm</Text>
      </Pressable>
      {takenMedia.slice(-4) == ".jpg" ? (
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{ uri: takenMedia }}
        ></Image>
      ) : (
        <Video
          shouldPlay={true}
          style={{ height: "100%", width: "100%" }}
          source={{ uri: takenMedia }}
        ></Video>
      )}
    </View>
  );
}
