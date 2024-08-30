import { CreatePostContext } from "@/context/createPostContext";
import { ResizeMode, Video } from "expo-av";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as VideoThumbnails from "expo-video-thumbnails";
import AntDesign from "@expo/vector-icons/AntDesign";

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
  const [pause, setPause] = useState<any[]>([false]);
  const RemoveSelectedMedia = () => {
    setMedia((prev) => prev.filter((e) => e !== value));
  };
  console.log(media.length - 1);
  console.log(index % 2 == 0, index);
  const generateThumbnail = async () => {
    if (value.slice(-4) !== ".jpg") {
      try {
        const { uri } = await VideoThumbnails?.getThumbnailAsync(value, {
          time: 500,
        });
        setThumnail(uri);
      } catch (e) {
        console.warn(e);
      }
    }
  };
  const pauseFunction = () => {
    if (!pause[1]) {
      setPause([true, value]);
    } else if (pause[1] == value) {
      setPause([false]);
    } else if (pause[1] !== value && pause[1]) {
      setPause([true, value]);
    }
  };
  useEffect(() => {
    generateThumbnail();
  }, []);
  console.log(index == 0, index % 2 == 0 && media.length - 1 == index, value);
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        position: "relative",
        // backgroundColor: "green",
      }}
    >
      {value.slice(-4) == ".mp4" && (
        <Pressable
          onPress={() => pauseFunction()}
          style={{
            position: "absolute",
            // top: 160,
            shadowColor: "black",
            shadowOpacity: 50,
            shadowOffset: { height: 10, width: 10 },
            shadowRadius: 50,
            zIndex: 60,
            justifyContent: "center",
            alignSelf: "center",
            // left: width * 0.45,
            left: "45%",
            // verticalAlign: "center",
          }}
        >
          {pause[0] && pause[1] == value ? (
            <AntDesign name="pause" size={24} color="white" />
          ) : (
            <AntDesign name="caretright" size={24} color="white" />
          )}
        </Pressable>
      )}
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
          shouldPlay={pause[1] == value && pause[0]}
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
          isLooping={true}
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
