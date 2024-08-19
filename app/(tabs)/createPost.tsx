import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreatePostButton } from "@/components/subComponents/CreatePostButton";
import HashTagSelect from "@/components/subComponents/HashTagSelect";
import { PhotoSelector } from "@/components/subComponents/PhotoSelector";
import { CreatePostContext } from "@/context/createPostContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Camera } from "@/components/subComponents/Camera";
import { PhotoConfirm } from "@/components/subComponents/PhotoConfirm";
import { BodyTextInput } from "@/components/subComponents/BodyTextInput";
import { TitleInput } from "@/components/subComponents/TitleInput";
import { SelectedMedia } from "@/components/subComponents/SelectedMedia";
import { CreateDraftButton } from "@/components/subComponents/CreateDraftButton";
import { LinkUrl } from "@/components/subComponents/LinkUrl";
import { LangContext } from "@/context/langContext";
import { homeTranslation } from "@/localization/translate";
import Modal from "react-native-modal";

export function CreatePost({ navigation }: { navigation: any }) {
  const { lang } = useContext(LangContext);
  const { media, linkComponent, setLinkComponent, selectedTags } =
    useContext(CreatePostContext);
  const [isVisible, setIsVisible] = useState(false);
  const { width, height } = Dimensions.get("window");
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
      <View style={{ flexDirection: "row" }}>
        <Pressable
          onPress={() => router.push("./home")}
          style={{ backgroundColor: "purple" }}
        >
          <Text style={{ color: "white" }}>
            {homeTranslation?.[lang]?.["goBack"]}
          </Text>
        </Pressable>
        <CreatePostButton />
        <CreateDraftButton />
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
          // onPress={() => navigation.navigate("HashtagSelect")}
          style={{ backgroundColor: "purple", height: 100 }}
        >
          <Text style={{ color: "white" }}>Hashtag select</Text>
        </Pressable>
        {/* <HashTagSelect /> */}
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
      {/* <HomeStack.Screen
        name="HashtagSelect"
        component={HashTagSelect}
        options={{
          ...transparentModalOptions,
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
        }}
      /> */}
    </HomeStack.Navigator>
  );
}
