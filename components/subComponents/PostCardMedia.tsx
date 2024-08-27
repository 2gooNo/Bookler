import { Video } from "expo-av";
import { useState } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export function PostCardMedia({ media }: any) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [pause, setPause] = useState<any[]>([false]);
  const pauseFunction = () => {
    if (!pause[1]) {
      setPause([true, media]);
    } else if (pause[1] == media) {
      setPause([false]);
    } else if (pause[1] !== media && pause[1]) {
      setPause([true, media]);
    }
  };
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
            // backgroundColor: "green",
          }}
          shouldPlay={pause[1] == media && pause[0]}
          source={{ uri: media?.url }}
          // resizeMode="contain"
          // repeat={true}
        />
      )}
      {media.type !== "image/jpeg" && (
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
          {pause[0] && pause[1] == media ? (
            <AntDesign name="pause" size={24} color="white" />
          ) : (
            <AntDesign name="caretright" size={24} color="white" />
          )}
        </Pressable>
      )}
    </View>
  );
}
