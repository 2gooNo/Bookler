import { CreatePostContext } from "@/context/createPostContext";
import { Video } from "expo-av";
import { useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

export function PhotoConfirm({ navigation }: { navigation: any }) {
  const { takenMedia, setTakenMedia, setMedia } = useContext(CreatePostContext);
  return (
    <View style={{ position: "relative" }}>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          top: 50,
          // backgroundColor: "green",
          zIndex: 100,
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <Pressable
          style={{}}
          onPress={() => {
            navigation.navigate("Camera");
            setTakenMedia("");
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Go back</Text>
        </Pressable>
        <Pressable
          style={{}}
          onPress={() => {
            navigation.navigate("CreatePost");
            setMedia((prev) => [...prev, takenMedia]);
            MediaLibrary.createAssetAsync(takenMedia);
            setTakenMedia("");
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Continue</Text>
        </Pressable>
      </View>
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
