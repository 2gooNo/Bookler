import { Video } from "expo-av";
import { Dimensions, Image, View } from "react-native";

export function PostCardMedia({ media }: any) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  console.log(media.type, "---", media);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 10,
      }}
    >
      {media.type === "image/jpeg" ? (
        <Image
          source={{ uri: media?.url }}
          style={{ width: windowWidth * 0.75, flex: 1 }}
        />
      ) : (
        <Video
          style={{
            flex: 1,
            width: windowWidth * 0.75,
            backgroundColor: "green",
          }}
          source={{ uri: media?.url }}
          // resizeMode="contain"
          // repeat={true}
        />
      )}
    </View>
  );
}
