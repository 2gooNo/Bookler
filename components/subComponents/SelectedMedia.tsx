import { CreatePostContext } from "@/context/createPostContext";
import { Video } from "expo-av";
import { useContext } from "react";
import { Image, Pressable, View } from "react-native";

export function SelectedMedia(value: { value: string; isBanner: boolean }) {
  const { setMedia, media } = useContext(CreatePostContext);
  const RemoveSelectedMedia = () => {
    media.forEach((e) => {
      if (e.includes(value?.value)) {
        setMedia((prev) => [...prev, e]);
      }
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
      }}
    >
      {value?.value.slice(-4) == ".jpg" ? (
        value?.isBanner ? (
          <Image
            style={{ height: "100%", width: "100%" }}
            source={{ uri: value?.value }}
          ></Image>
        ) : (
          <Image
            style={{ height: "100%", width: "100%", borderRadius: 50 }}
            source={{ uri: value?.value }}
          ></Image>
        )
      ) : (
        <Video
          shouldPlay={false}
          isMuted={false}
          style={{ height: 200, width: "50%" }}
          source={{ uri: value?.value }}
        ></Video>
      )}
      <Pressable onPress={() => RemoveSelectedMedia()}></Pressable>
    </View>
  );
}
