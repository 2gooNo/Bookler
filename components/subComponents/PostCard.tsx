import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button, Linking, Modal, Pressable, Text, View } from "react-native";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PostOptions } from "./PostOptions";
import Swiper from "react-native-swiper";
import { PostCardMedia } from "./PostCardMedia";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FullWindowOverlay } from "react-native-screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GestureRecognizer from "react-native-swipe-gestures";
import { PostContext } from "@/context/postContext";

export function PostCard({
  item,
  bottomSheetRef,
  navigation,
}: {
  item: any;
  bottomSheetRef: any;
  navigation: any;
}) {
  const { setCurrentPostData } = useContext(PostContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  console.log(setCurrentPostData);
  const supportedURL = "https://google.com";
  const unsupportedURL = "slack://open?team=123456";

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
    <GestureHandlerRootView
      style={{
        flexDirection: "column",
        backgroundColor: "grey",
        // position: "relative",
      }}
    >
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
        <Pressable
          onPress={() => {
            navigation.getParent().setOptions({
              tabBarStyle: {
                display: "none",
              },
            });
            if (bottomSheetRef.current) {
              console.log("expand");
              bottomSheetRef.current.expand();
              setModalVisible(true);
              setCurrentPostData(item);
            }
          }}
        >
          <AntDesign name="ellipsis1" size={24} color="black" />
        </Pressable>
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
      {/* <GestureRecognizer onSwipeDown={() => setModalVisible(false)}>
        <Modal
          presentationStyle="pageSheet"
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          style={{ backgroundColor: "green" }}
        > */}
      {/* <BottomSheetModalProvider>
        <BottomSheet
          snapPoints={[200, 600]}
          onChange={handleSheetChanges}
          ref={bottomSheetRef}
          index={-1}
          containerHeight={600}
          enablePanDownToClose={true}
          style={{
            width: "100%",
            height: "auto",
            zIndex: 10,
          }}
        >
          <FullWindowOverlay>
          <View> 
          <PostOptions />
          </View>
          </FullWindowOverlay>
        </BottomSheet>
      </BottomSheetModalProvider> */}

      {/* </Modal>
      </GestureRecognizer> */}
      {item?.post?.[0]?.tags && (
        <View style={{ flexDirection: "row", gap: 10 }}>
          {item?.post?.[0]?.tags.map((hashtag: any, index: number) => (
            <Pressable key={index}>
              <Text style={{ color: "#d3d3d3" }}>#{hashtag.tagName}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <View style={{ flexDirection: "row", backgroundColor: "yellow" }}></View>
    </GestureHandlerRootView>
  );
}
