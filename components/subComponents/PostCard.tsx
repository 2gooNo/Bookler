import { useContext } from "react";
import { Dimensions, Linking, Pressable, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import { PostCardMedia } from "./PostCardMedia";
import { Image } from "expo-image";
import Entypo from "@expo/vector-icons/Entypo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PostContext } from "@/context/postContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { PostLikes } from "./PostLikes";
import { RepostButton } from "./RepostButton";

const { height, width } = Dimensions.get("window");

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
        backgroundColor: "#121212",
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
            <Pressable
              onPress={() => {
                router.navigate(`../otherProfile/${item?.user?.userId}`);
              }}
            >
              <Image
                style={{
                  height: height * 0.04,
                  width: width * 0.08,
                  borderRadius: 50,
                  backgroundColor: "pink",
                }}
                source={{
                  uri:
                    item?.user?.photoUrl ||
                    "https://nestcore-my.sharepoint.com/da4d4fc4-9a28-497e-abdb-0b23672a14bb",
                }}
              />
            </Pressable>
          )}
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "white" }}>
              {item?.user?.userName || "Unavailable user"}
            </Text>
            <View style={{ flexDirection: "row", gap: 2 }}>
              <Pressable
                onPress={() =>
                  router.navigate(`/details/${[item?.post?.[0]?.book?.id, 1]}`)
                }
              >
                <Text style={{ color: "grey" }}>
                  {item?.post?.[0]?.book?.name}
                </Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  router.navigate(
                    `/details/${[
                      item?.post?.[0]?.book?.id,
                      item?.post?.[0]?.chapter?.number,
                    ]}`
                  )
                }
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  style={{ color: "grey", width: 180, overflow: "hidden" }}
                >
                  {/* / {item?.post?.[0]?.chapter?.number + 1} */}/{" "}
                  {item?.post?.[0]?.chapter?.name}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => {

            navigation?.getParent()?.setOptions({
              tabBarStyle: {
                display: "none",
              },
            });
            if (bottomSheetRef.current) {
              bottomSheetRef.current.expand();

              setCurrentPostData(item);
            }
          }}
        >
          <Entypo name="dots-three-horizontal" size={24} color="white" />
        </Pressable>
      </View>
      <View style={{ flexDirection: "column", gap: 10 }}>
        {item?.post?.[0]?.title && (
          // <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "500",

              // backgroundColor: "green",
              width: "100%",
              // flexGrow: 1,
            }}
          >
            {item?.post?.[0]?.title}
          </Text>
          // </View>
        )}
        {item?.post?.[0]?.link && (
          <Pressable
            onPress={handlePress}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderColor: "grey",
              borderWidth: 0.5,
              borderRadius: 50,
            }}
          >
            <Text style={{ color: "white" }}>{item?.post?.[0]?.link}</Text>
          </Pressable>
        )}

        {item?.post?.[0]?.bodyText && (
          <Text style={{ color: "white" }}>{item?.post?.[0]?.bodyText}</Text>
        )}
        {item?.post?.[0]?.media?.[0] && (
          <Swiper
            showsButtons={true}
            style={{ backgroundColor: "transparent", borderRadius: 10 }}
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
      </View>
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
        <PostLikes item={item} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
          }}
        >
          <RepostButton post={item} />
          <Pressable>
            <FontAwesome6 name="retweet" size={20} color="white" />
          </Pressable>

          <Pressable
            onPress={() => router.navigate(`/commentPage/${item?.post?.[1]}`)}
            style={{
              flexDirection: "row",
              paddingVertical: 3,
              // paddingHorizontal: 10,
              borderRadius: 20,
              gap: 7,
              // borderColor: "white",
              // borderWidth: 0.5,
            }}
          >
            <FontAwesome5 name="comment" size={20} color="white" />
            {/* <Text style={{ color: "white" }}></Text> */}
          </Pressable>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
