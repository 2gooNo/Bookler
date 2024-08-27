import { CreatePostContext } from "@/context/createPostContext";
import { Video } from "expo-av";
import { useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

export function PhotoConfirm({ navigation }: { navigation: any }) {
  const { takenMedia, setTakenMedia, setMedia } = useContext(CreatePostContext);
  return (
    <View>
      <Pressable
        style={{ height: 100, width: 100 }}
        onPress={() => {
          navigation.navigate("Camera");
          setTakenMedia("");
        }}
      >
        <Text style={{ color: "black" }}>Take a dif phto</Text>
      </Pressable>
      <Pressable
        style={{ height: 100, width: 100 }}
        onPress={() => {
          navigation.navigate("CreatePost");
          setMedia((prev) => [...prev, takenMedia]);
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
          isMuted={false}
          shouldPlay={true}
          style={{ height: "100%", width: "100%" }}
          source={{ uri: takenMedia }}
        ></Video>
      )}
    </View>
  );
}
