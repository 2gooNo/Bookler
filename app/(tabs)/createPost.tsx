import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HashTagSelect from "@/components/subComponents/HashTagSelect";
import { PhotoSelector } from "@/components/subComponents/PhotoSelector";
import { CreatePostContext } from "@/context/createPostContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
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
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");

export function CreatePost({ navigation }: { navigation: any }) {
  const { lang } = useContext(LangContext);
  const { media, linkComponent, setLinkComponent, selectedTags, title } =
    useContext(CreatePostContext);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      // keyboardVerticalOffset={height * 0.085}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
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
          <View style={styles.header}>
            <Pressable
              onPress={() => router.push("./home")}
              // style={{ backgroundColor: "purple", width: 100 }}
            >
              <Text style={{ color: "white" }}>
                {homeTranslation?.[lang]?.["goBack"]}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("BookSelect")}
              // style={{ backgroundColor: "purple" }}
              disabled={title ? false : true}
            >
              <Text style={{ color: title ? "white" : "grey" }}>Next</Text>
            </Pressable>
          </View>
          <ScrollView horizontal={false}>
            <TitleInput />
            {linkComponent && <LinkUrl />}
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}
            >
              {media.map((media, index) => (
                <SelectedMedia value={media} key={index} />
              ))}
            </View>
            <BodyTextInput />
          </ScrollView>
          <View style={styles.footer}>
            <Pressable
              onPress={() => setIsVisible(true)}
              // style={{ backgroundColor: "purple", height: 10]0 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {selectedTags[0] && (
                  <Ionicons
                    name="add"
                    size={20}
                    color="white"
                    style={{ backgroundColor: "blue" }}
                  />
                )}
                {!selectedTags[0] ? (
                  <Text style={{ color: "white" }}>
                    # Add tags to help people find your post
                  </Text>
                ) : (
                  selectedTags.map((tag, index) => (
                    <Text key={index} style={{ color: "white" }}>
                      #{tag.tagName}
                    </Text>
                  ))
                )}
              </View>
            </Pressable>

            <View style={styles.footerBottom}>
              <PhotoSelector />
              <Pressable onPress={() => navigation.navigate("Camera")}>
                <Feather name="camera" size={26} color="white" />
              </Pressable>
              <Pressable onPress={() => setLinkComponent(!linkComponent)}>
                <AntDesign name="link" size={26} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    //   keyboardVerticalOffset={height * 0.085}
    // >
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    // <View style={{ paddingVertical: "30%" }}> */
    //  </View>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
}
const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen() {
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
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ChapterSelect"
        component={ChapterSelect}
        options={{
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: height * 0.075,
    height: height * 0.115,
    width: "100%",
    backgroundColor: "pink",
    paddingHorizontal: 15,
  },
  footer: {
    backgroundColor: "pink",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: height * 0.16,
    position: "absolute",
    paddingBottom: height * 0.06,
    paddingTop: height * 0.02,
    bottom: 0,
    width: "100%",
  },
  footerBottom: {
    flexDirection: "row",
    gap: 20,
    width: "100%",
  },
  submitButton: {
    height: "100%",
    justifyContent: "center",
  },
});
