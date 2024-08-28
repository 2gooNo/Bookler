import { useContext, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import Modal from "react-native-modal";
import { CreatePostContext } from "@/context/createPostContext";
import { CreateDraftButton } from "./CreateDraftButton";

const { height, width } = Dimensions.get("window");

export function ExitButton() {
  const {
    media,
    takenMedia,
    title,
    bodyText,
    linkUrl,
    selectedBook,
    draft,
    setTakenMedia,
    setBodyText,
    setLinkUrl,
    setMedia,
    setSelectedBook,
    setSelectedChapter,
    setSelectedTags,
    setLinkComponent,
    setTitle,
    setDraft,
  } = useContext(CreatePostContext);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(title);
  const exit = () => {
    if (
      media[0] ||
      takenMedia[0] ||
      title ||
      bodyText ||
      linkUrl ||
      selectedBook?.id ||
      draft[1] !== ""
    ) {
      setModalVisible(true);
    } else {
      resetValues();
      router.push("./home");
    }
  };
  const resetValues = () => {
    setTakenMedia("");
    setBodyText("");
    setLinkUrl("");
    setMedia([]);
    setSelectedBook({
      id: "",
      name: "",
    });
    setSelectedChapter({
      number: null,
      name: "",
    });
    setSelectedTags([]);
    setLinkComponent(false);
    setTitle("");
    setModalVisible(false);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        deviceWidth={width}
        swipeDirection={"down"}
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => {
          console.log("Backdrop pressed");
          setModalVisible(false);
        }}
        style={{
          margin: 0,
          flex: 1,
          justifyContent: "flex-end",
        }}
        hasBackdrop={true}
        backdropOpacity={0}
        backdropColor={"pink"}
        avoidKeyboard={true}
      >
        {/* <View style={styles.modalViewOuter}> */}
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Save draft</Text>
          <Text style={styles.modalText}>
            Save your changes and come back later to finish your post later!
          </Text>
          <View style={styles.buttonView}>
            <Pressable
              style={[styles.button]}
              onPress={async () => {
                resetValues();
                router.push("./home");
              }}
            >
              <Text style={styles.textStyle}>Discard</Text>
            </Pressable>
            <CreateDraftButton setModalVisible={setModalVisible} />
          </View>
        </View>
        {/* </View> */}
      </Modal>
      <Pressable style={styles.buttonOpen} onPress={() => exit()}>
        <FontAwesome6 name="x" size={17} color="white" />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "flex-end",
    // alignItems: "flex-end",
    zIndex: 100,
    height: "100%",
  },

  modalView: {
    backgroundColor: "#121212",
    alignItems: "center",
    flexDirection: "column",
    gap: 15,
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    bottom: 0,
  },
  buttonView: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    width: "45%",
    alignItems: "center",
    paddingVertical: 15,
    // backgroundColor: "blue",
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
    // padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0,
    marginBottom: 8,
    height: height * 0.04,
    width: width * 0.08,
  },
  buttonClose: {
    // backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#807f7e",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#807f7e",
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "500",
    color: "#e8e3e0",
  },
});
