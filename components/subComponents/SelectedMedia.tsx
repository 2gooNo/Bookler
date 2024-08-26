import { CreatePostContext } from "@/context/createPostContext";
import { ResizeMode, Video } from "expo-av";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as VideoThumbnails from "expo-video-thumbnails";

const { height, width } = Dimensions.get("window");

export function SelectedMedia({
  value,
  index,
}: {
  value: string;
  index: number;
}) {
  const { setMedia, media } = useContext(CreatePostContext);
  const [thumnail, setThumnail] = useState(
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAAB//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z"
  );
  const RemoveSelectedMedia = () => {
    setMedia((prev) => prev.filter((e) => e !== value));
  };
  console.log(media.length - 1);
  console.log(index % 2 == 0, index);
  const generateThumbnail = async () => {
    try {
      if (value.slice(-4) !== ".jpg") {
        const { uri } = await VideoThumbnails.getThumbnailAsync(value, {
          time: 500,
        });
        setThumnail(uri);
      }
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    generateThumbnail();
  }, []);
  console.log(
    index == 0,
    index % 2 == 0 && media.length - 1 == index,
    media.length == 2
  );
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        position: "relative",
        backgroundColor: "green",
      }}
    >
      {value.slice(-4) == ".jpg" ? (
        <Image
          style={{
            height: height * 0.3,
            width:
              index == 0 ||
              (index % 2 == 0 && media.length - 1 == index) ||
              media.length == 2
                ? width
                : width * 0.45,
          }}
          source={{ uri: value }}
        ></Image>
      ) : (
        <Video
          posterSource={{
            uri: thumnail,
          }}
          shouldPlay={false}
          isMuted={false}
          style={{
            height:
              index == 0 ||
              (index % 2 == 0 && media.length - 1 == index) ||
              media.length == 2
                ? 350
                : 200,
            width:
              index == 0 || (index % 2 == 0 && media.length - 1 == index)
                ? width
                : width * 0.5,
          }}
          source={{ uri: value }}
          resizeMode={ResizeMode.CONTAIN}
          usePoster={true}
          isLooping={false}
        />
      )}
      <Pressable
        onPress={() => RemoveSelectedMedia()}
        style={{
          position: "absolute",
          backgroundColor: "grey",
          paddingHorizontal: 7,
          paddingVertical: 5,
          borderRadius: 20,
          opacity: 10,
        }}
      >
        <FontAwesome6 name="x" size={15} color="white" />
      </Pressable>
    </View>
  );
}
