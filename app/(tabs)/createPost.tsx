import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HashTagSelect from "@/components/subComponents/HashTagSelect";
import { PhotoSelector } from "@/components/subComponents/PhotoSelector";
import { CreatePostContext } from "@/context/createPostContext";
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
import { CreatePostButton } from "@/components/subComponents/CreatePostButton";
import { CreateDraftButton } from "@/components/subComponents/CreateDraftButton";
import { CreatePostBookCard } from "@/components/subComponents/CreatePostBookCard";
import { ExitButton } from "@/components/subComponents/CreatePostExitButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { height, width } = Dimensions.get("window");

export function CreatePost({ navigation }: { navigation: any }) {
  const { lang } = useContext(LangContext);
  const [scrolling, setScrolling] = useState(false);
  const {
    media,
    linkComponent,
    setLinkComponent,
    selectedTags,
    title,
    selectedBook,
    selectedChapter,
    bodyText,
  } = useContext(CreatePostContext);
  const [isVisible, setIsVisible] = useState(false);
  console.log("uriu");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "position"}
      style={styles.container}
      keyboardVerticalOffset={-height * 0.035}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Modal
            avoidKeyboard={true}
            deviceWidth={width}
            onBackdropPress={() => setIsVisible(false)}
            isVisible={isVisible}
            onSwipeComplete={() => setIsVisible(false)}
            swipeThreshold={20}
            swipeDirection={scrolling ? [] : ["down"]}
            style={{
              margin: 0,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <HashTagSelect
              setIsVisible={setIsVisible}
              setScrolling={setScrolling}
            />
          </Modal>
          <View style={styles.header}>
            <ExitButton></ExitButton>
            {(!selectedBook.id || !selectedChapter.number) && (
              <Pressable
                onPress={() => navigation.navigate("BookSelect")}
                disabled={title || bodyText || media[0] ? false : true}
              >
                <View
                  style={
                    title || bodyText || media[0]
                      ? styles.nextOpen
                      : styles.nextClose
                  }
                >
                  <Text style={{ fontSize: 16 }}>Дараах</Text>
                </View>
              </Pressable>
            )}
            {selectedBook.id && selectedChapter.number && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  // backgroundColor: "yellow",
                  justifyContent: "flex-end",
                }}
              >
                <CreateDraftButton />
                <CreatePostButton />
              </View>
            )}
          </View>

          <KeyboardAwareScrollView
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            extraScrollHeight={20}
          >
            <View style={styles.contentContainer}>
              {selectedBook.id && (
                <CreatePostBookCard navigation={navigation} />
              )}
              <TitleInput />
              <BodyTextInput />
              {linkComponent && <LinkUrl />}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                {media[0] &&
                  media.map((media, index) => (
                    <SelectedMedia value={media} key={index} index={index} />
                  ))}
              </View>
            </View>
          </KeyboardAwareScrollView>

          <View
            style={{
              ...styles.footer,
            }}
          >
            <Pressable onPress={() => setIsVisible(true)}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {selectedTags?.[0] && (
                  <View style={styles.tag}>
                    <Ionicons name="add" size={18} color="white" />
                  </View>
                )}
                {!selectedTags?.[0] ? (
                  <View style={styles.tagAdd}>
                    <Text>
                      # Шошго нэмж таны постыг олоход хялбар болгоорой
                    </Text>
                  </View>
                ) : (
                  selectedTags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>#{tag.tagName}</Text>
                    </View>
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
    backgroundColor: "#0d0c0c",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: height * 0.05,
    height: height * 0.115,
    width: "100%",
    backgroundColor: "#2e2c2b",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  contentContainer: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  footer: {
    backgroundColor: "#0d0c0c",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: height * 0.175,
    position: "absolute",
    paddingBottom: height * 0.06,
    paddingVertical: height * 0.02,
    bottom: 0,
    width: "100%",
    gap: 0,
    // marginBottom: height * 0.035,
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
  tag: {
    backgroundColor: "#1DA1F2",
    borderRadius: 40,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  tagText: {
    color: "white",
  },
  tagAdd: {
    backgroundColor: "white",
    borderRadius: 40,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  // tagTextAdd:{
  //   color:""
  // }
  nextOpen: {
    backgroundColor: "#1DA1F2",
    padding: 7,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  openText: {
    color: "white",
  },
  nextClose: {
    backgroundColor: "grey",
    padding: 7,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  closeText: {},
});
