import { useContext } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import { PostCardMedia } from "./PostCardMedia";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PostContext } from "@/context/postContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
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
              {item?.user?.userName || "Unavailable user"}
            </Text>
            <Text style={{ color: "white" }}>Book commuinity / Chapter</Text>
          </View>
        </View>

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

              setCurrentPostData(item);
            }
          }}
        >
          <AntDesign name="ellipsis1" size={24} color="black" />
        </Pressable>
      </View>
      {item?.post?.[0]?.title && (
        <Text style={{ color: "white" }}>{item?.post?.[0]?.title || ""}</Text>
      )}
      {item?.post?.[0]?.link && (
        <Pressable onPress={handlePress}>
          <Text style={{ color: "blue" }}>{item?.post?.[0]?.link}</Text>
        </Pressable>
      )}
      {item?.post?.[0]?.bodytext && <Text>{item?.post?.[0]?.bodytext}</Text>}
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

      {item?.post?.[0]?.tags && (
        <View style={{ flexDirection: "row", gap: 10 }}>
          {item?.post?.[0]?.tags.map((hashtag: any, index: number) => (
            <Pressable key={index}>
              <Text style={{ color: "#d3d3d3" }}>#{hashtag.tagName}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "blue",
            paddingVertical: 3,
            paddingHorizontal: 10,
            borderRadius: 50,
            gap: 7,
          }}
        >
          <Pressable onPress={() => console.log("funct")}>
            <FontAwesome name="arrow-up" size={20} color="white" />
          </Pressable>
          <Text style={{ color: "white" }}></Text>
          <Pressable onPress={() => console.log("funct")}>
            <FontAwesome name="arrow-down" size={20} color="white" />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
          }}
        >
          <Pressable onPress={() => console.log("funct")}>
            <FontAwesome6 name="retweet" size={20} color="white" />
          </Pressable>
          <Pressable onPress={() => console.log("funct")}>
            <FontAwesome name="share-square-o" size={20} color="white" />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("CommentPage")}
            style={{
              flexDirection: "row",
              paddingVertical: 3,
              paddingHorizontal: 10,
              borderRadius: 40,
              gap: 7,
              backgroundColor: "green",
            }}
          >
            <FontAwesome5 name="comment" size={20} color="white" />
            <Text style={{ color: "white" }}></Text>
          </Pressable>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
