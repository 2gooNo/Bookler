import { Video } from "expo-av";
import { Image, View } from "react-native";

export function PostCardMedia({ media }: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB",
      }}
    >
      {media.type === "image/jpeg" ? (
        <Image
          source={{ uri: media?.url }}
          style={{ height: 150, width: 150 }}
        />
      ) : (
        <Video
          style={{ height: 150, width: 150, backgroundColor: "pink" }}
          source={{ uri: media?.url }}
          // resizeMode="contain"
          // repeat={true}
        />
      )}
    </View>
  );
}
