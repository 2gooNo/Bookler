import { useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { CreatePostContext } from "@/context/createPostContext";
import { CreateDraftButton } from "./CreateDraftButton";

export function ExitButton() {
  const {
    media,
    takenMedia,
    title,
    bodyText,
    linkUrl,
    selectedBook,
    setTakenMedia,
    setBodyText,
    setLinkUrl,
    setMedia,
    setSelectedBook,
    setSelectedChapter,
    setSelectedTags,
    setLinkComponent,
    setTitle,
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
      selectedBook?.id
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
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={async () => {
                  resetValues();
                  router.push("./home");
                }}
              >
                <Text style={styles.textStyle}>Discard</Text>
              </Pressable>
              <CreateDraftButton />
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => exit()}
      >
        <FontAwesome6 name="x" size={15} color="white" />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
    bottom: 0,
  },
  buttonView: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "blue",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
