import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HashTagSelect from "@/components/subComponents/HashTagSelect";
import { PhotoSelector } from "@/components/subComponents/PhotoSelector";
import { CreatePostContext } from "@/context/createPostContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { Camera } from "@/components/subComponents/Camera";
import { PhotoConfirm } from "@/components/subComponents/PhotoConfirm";
import { BodyTextInput } from "@/components/subComponents/BodyTextInput";
import { TitleInput } from "@/components/subComponents/TitleInput";
import { SelectedMedia } from "@/components/subComponents/SelectedMedia";
import { LinkUrl } from "@/components/subComponents/LinkUrl";
import { LangContext } from "@/context/langContext";
import { homeTranslation } from "@/localization/translate";
import Modal from "react-native-modal";
import { BookSelect } from "@/components/subComponents/BookSelect";
import { ChapterSelect } from "@/components/subComponents/ChapterSelect";

export function CreatePost({ navigation }: { navigation: any }) {
  const { lang } = useContext(LangContext);
  const { media, linkComponent, setLinkComponent, selectedTags, title } =
    useContext(CreatePostContext);
  const [isVisible, setIsVisible] = useState(false);
  const { width } = Dimensions.get("window");
  return (
    <View style={{ paddingVertical: "30%" }}>
      <Modal
        avoidKeyboard={true}
        deviceWidth={width}
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
        onSwipeComplete={() => setIsVisible(false)}
        swipeDirection={"down"}
        style={{
          margin: 0,
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <HashTagSelect setIsVisible={setIsVisible} />
      </Modal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Pressable
          onPress={() => router.push("./home")}
          style={{ backgroundColor: "purple" }}
        >
          <Text style={{ color: "white" }}>
            {homeTranslation?.[lang]?.["goBack"]}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("BookSelect")}
          style={{ backgroundColor: "purple" }}
          disabled={title ? false : true}
        >
          <Text style={{ color: title ? "white" : "grey" }}>Next</Text>
        </Pressable>
      </View>
      <ScrollView horizontal={false}>
        <TitleInput />
        {linkComponent && <LinkUrl />}
        <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
          {media.map((media, index) => (
            <SelectedMedia value={media} key={index} />
          ))}
        </View>
        <BodyTextInput />
      </ScrollView>
      <View style={{ flexDirection: "column" }}>
        {selectedTags.map((tag, index) => (
          <Text key={index} style={{ color: "white" }}>
            #{tag.tagName}
          </Text>
        ))}
        <Pressable
          onPress={() => setIsVisible(true)}
          style={{ backgroundColor: "purple", height: 100 }}
        >
          <Text style={{ color: "white" }}>Hashtag select</Text>
        </Pressable>

        <View style={{ flexDirection: "row" }}>
          <PhotoSelector />
          <Pressable
            onPress={() => navigation.navigate("Camera")}
            style={{ backgroundColor: "purple", height: 100 }}
          >
            <Text style={{ color: "white" }}>Camera</Text>
          </Pressable>
          <Pressable
            onPress={() => setLinkComponent(!linkComponent)}
            style={{ backgroundColor: "purple", height: 100 }}
          >
            <Text style={{ color: "white" }}>Link</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen() {
  // const options = {
  //   animation: "slide_from_bottom",
  //   headerShown: false,
  //   // gestureDirection: "vertical",
  //   gestureEnabled: true,
  //   presentation: "modal",
  // };
  const transparentModalOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: "transparent" },
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current: { progress } }: any) => ({
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1],
        }),
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
          extrapolate: "clamp",
        }),
      },
    }),
  };
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Camera"
        component={Camera}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PhotoConfirm"
        component={PhotoConfirm}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="BookSelect"
        component={BookSelect}
        options={{
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
        }}
      />
      <HomeStack.Screen
        name="ChapterSelect"
        component={ChapterSelect}
        options={{
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
        }}
      />
    </HomeStack.Navigator>
  );
}
