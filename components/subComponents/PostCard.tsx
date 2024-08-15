import { useCallback, useRef } from "react";
import { Button, Linking, Pressable, Text, View } from "react-native";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PostOptions } from "./PostOptions";
import Swiper from "react-native-swiper";
import { PostCardMedia } from "./PostCardMedia";

export function PostCard({ item }: { item: any }) {
  const supportedURL = "https://google.com";
  const unsupportedURL = "slack://open?team=123456";
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  console.log(item);

  const handlePress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(item?.post?.[0]?.link);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(item?.post?.[0]?.link);
    } else {
      alert(`Don't know how to open this URL: ${item?.post?.[0]?.link}`);
    }
  };
  return (
    <View>
      <Text style={{ color: "white" }}>{item?.post?.[0]?.title || ""}</Text>
      {/* {item?.post?.[0]?.link && <Button title={"link"} onPress={handlePress} />} */}
      <Text>{item?.post?.[0]?.bodytext}</Text>
      {item?.post?.[0]?.media && (
        <Swiper
          showsButtons={true}
          style={{ backgroundColor: "green" }}
          loop={false}
          index={0}
          height={300}
        >
          {item?.post?.[0]?.media?.map((media: any, index: number) => (
            <PostCardMedia key={index} media={media} />
          ))}
        </Swiper>
      )}
      {/* <Button
        title="Open Bottom Sheet"
        onPress={() =>
          bottomSheetRef.current && bottomSheetRef.current.expand()
        }
      /> */}

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
      {/* {item?.post?.[0]?.tags && (
        <View>
          {item?.post?.[0]?.tags.map((hashtag: any, index: number) => (
            <Pressable key={index}>
              <Text style={{ color: "white" }}>{hashtag.tagName}</Text>
            </Pressable>
          ))}
        </View>
      )} */}
    </View>
  );
}
