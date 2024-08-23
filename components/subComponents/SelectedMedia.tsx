import { CreatePostContext } from "@/context/createPostContext";
import { Video } from "expo-av";
import { useContext } from "react";
import { Image, Pressable, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export function SelectedMedia({
  value,
  index,
}: {
  value: string;
  index: number;
}) {
  const { setMedia, media } = useContext(CreatePostContext);
  const RemoveSelectedMedia = () => {
    media.forEach((e) => {
      if (e.includes(value)) {
        setMedia((prev) => [...prev, e]);
      }
    });
  };

  console.log(index % 2 == 0);
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
      }}
    >
      {value.slice(-4) == ".jpg" ? (
        <Image
          style={{
            height: "100%",
            width: index == 1 || index % 2 == 0 ? "50%" : "100%",
          }}
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
      <Pressable onPress={() => RemoveSelectedMedia()}>
        <FontAwesome6 name="x" size={24} color="white" />
      </Pressable>
    </View>
  );
}
