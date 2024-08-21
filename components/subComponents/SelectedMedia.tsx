import { CreatePostContext } from "@/context/createPostContext";
import { Video } from "expo-av";
import { useContext } from "react";
import { Image, Pressable, View } from "react-native";

export function SelectedMedia({ value }: { value: string }) {
  const { setMedia, media } = useContext(CreatePostContext);
  const RemoveSelectedMedia = () => {
    media.forEach((e) => {
      if (e.includes(value)) {
        setMedia((prev) => [...prev, e]);
      }
    });
  };
  console.log(value);
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
      {value.slice(-4) == ".jpg" ? (
        <Image
          style={{ height: 200, width: "50%" }}
          source={{ uri: value }}
        ></Image>
      ) : (
        <Video
          shouldPlay={false}
          isMuted={false}
          style={{ height: 200, width: "50%" }}
          source={{ uri: value }}
        ></Video>
      )}
      <Pressable onPress={() => RemoveSelectedMedia()}></Pressable>
    </View>
  );
}
