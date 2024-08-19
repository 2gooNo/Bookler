import { useCallback, useRef } from "react";
import { Button, Linking, Pressable, Text, View } from "react-native";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PostOptions } from "./PostOptions";
import Swiper from "react-native-swiper";
import { PostCardMedia } from "./PostCardMedia";
import { Image } from "expo-image";

export function PostCard({ item }: { item: any }) {
  const supportedURL = "https://google.com";
  const unsupportedURL = "slack://open?team=123456";
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(item?.post?.[0]?.link);

    if (supported) {
      await Linking.openURL(item?.post?.[0]?.link);
    } else {
      alert(`Unavailable URL: ${item?.post?.[0]?.link}`);
    }
  };
  if (!item) return;
  return (
    <View style={{ flexDirection: "column", backgroundColor: "grey" }}>
      <View style={{ flexDirection: "row" }}>
        {item?.user?.photoUrl && (
          <Image
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              backgroundColor: "pink",
            }}
            source={{
              uri:
                item?.user?.photoUrl ||
                "https://nestcore-my.sharepoint.com/da4d4fc4-9a28-497e-abdb-0b23672a14bb",
            }}
          ></Image>
        )}
        <View style={{ flexDirection: "column" }}>
          <Text style={{ color: "white" }}>
            {item?.user?.userName || "User deleted"}
          </Text>
          <Text style={{ color: "white" }}>Book commuinity / Chapter</Text>
        </View>

        {/* <Button
        title="Open Bottom Sheet"
        onPress={() =>
          bottomSheetRef.current && bottomSheetRef.current.expand()
        }
      /> */}
      </View>
      <Text style={{ color: "white" }}>{item?.post?.[0]?.title || ""}</Text>
      {item?.post?.[0]?.link && (
        <Pressable onPress={handlePress}>
          <Text style={{ color: "blue" }}>{item?.post?.[0]?.link}</Text>
        </Pressable>
      )}
      <Text>{item?.post?.[0]?.bodytext}</Text>
      {item?.post?.[0]?.media?.[0] && (
        <Swiper
          showsButtons={true}
          style={{ backgroundColor: "yellow" }}
          loop={false}
          index={0}
          height={300}
        >
          {item?.post?.[0]?.media?.map((media: any, index: number) => (
            <PostCardMedia key={index} media={media} />
          ))}
        </Swiper>
      )}

      {/* <BottomSheet
        index={-1}
        // bottomInset={0}
        detached={true}
        enablePanDownToClose={true}
        containerHeight={300}
        snapPoints={[1, 200, 600]}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        style={{ marginBottom: 0 }}
      >
        <PostOptions />
      </BottomSheet> */}
      {item?.post?.[0]?.tags && (
        <View>
          {item?.post?.[0]?.tags.map((hashtag: any, index: number) => (
            <Pressable key={index}>
              <Text style={{ color: "#d3d3d3" }}>#{hashtag.tagName}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <View style={{ flexDirection: "row" }}></View>
    </View>
  );
}
