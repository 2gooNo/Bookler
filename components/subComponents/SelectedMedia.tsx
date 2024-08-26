import { CreatePostContext } from "@/context/createPostContext";
import { Video } from "expo-av";
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
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA3gMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAFRABAQAAAAAAAAAAAAAAAAAAAAH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOIiAAAAAAAAACoIKACUVAFRQAAIqAKIAAAAKIKgAAAAACAACgAAAIoKgqCCooAAAAAAAEARUUAAUBABAVFSgogCgCgAAKDIqCKIAogCgAAAAAIqAoICoAKgAAAKgCgCgACKAgAgACgACNAgAAACKgAAAUAAFABAAFEUUBAVFAABAAAAAAUAAABBUEAAAAAAAAAAFAUAAAAAEAJAAFABFAAAAQKCAAAAAAAACoAokUUAAAECAAAoAIoAAAAipRAAAAAAAAAACKigAAACgAgCggAoAAAAlVBAAAAAAAAAAAAFAAAFABAAVUoAACAAJQAAAAAAAAAFAEhQBQBQACKAP//Z"
  );
  const RemoveSelectedMedia = () => {
    setMedia((prev) => prev.filter((e) => e !== value));
  };
  console.log(media.length - 1);
  console.log(index % 2 == 0, index);
  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        {
          time: 15000,
        }
      );
      setThumnail(uri);
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    generateThumbnail();
  }, []);
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
              index == 0 || (index % 2 == 0 && media.length - 1 == index)
                ? width
                : width * 0.5,
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
              index == 0 || (index % 2 == 0 && media.length - 1 == index)
                ? 350
                : 200,
            width:
              index == 0 || (index % 2 == 0 && media.length - 1 == index)
                ? width
                : width * 0.5,
          }}
          source={{ uri: value }}
          resizeMode="cover"
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
