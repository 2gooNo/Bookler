import UserIcon from "@/assets/images/UserIcon";
import React, { useContext, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Image,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import GestureRecognizer from "react-native-swipe-gestures";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { mediaUploader } from "@/utils/image-uploader";
import { SelectedMedia } from "./SelectedMedia";

export function EditProfileModal() {
  const { userData } = useContext(AuthContext);
  const [photos, setPhotos] = useState<any>(
    userData?.photoUrl == "" ? "" : userData?.photoUrl
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [inputVals, setInputVals] = useState({
    banner: `${userData?.banner}`,
    bio: `${userData?.bio}`,
    photoUrl: `${userData?.photoUrl}`,
    userName: `${userData?.userName}`,
  });

  async function updateUser() {
    const uploadedMedia = await mediaUploader([photos]);
    console.log(uploadedMedia);

    const profilePic = doc(db, "users", userData.userId);

    await updateDoc(profilePic, {
      // banner: inputVals.banner,
      bio: inputVals.bio,
      photoUrl: uploadedMedia[0].url,
      userName: inputVals.userName,
    });
    console.log("done");
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result?.assets);
      result?.assets.forEach((image) => {
        console.log(image);
        setPhotos(image.uri);
      });
    }
  };
  return (
    // <GestureRecognizer
    //   style={{ flex: 1 }}
    //   // onSwipeUp={() => setModalVisible(true)}
    //   onSwipeDown={() => setModalVisible(false)}
    // >
    //   <Modal
    //     animationType="slide"
    //     presentationStyle="formSheet"
    //     visible={modalVisible}
    //   >
    <View style={styles.allContainer}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.textStyle}>Close Modal</Text>
      </Pressable>
      <View>
        {/* {userData?.banner == "" ? (
          <UserIcon
            style={{
              borderBlockColor: "white",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          />
        ) : (
          <Image
            width={10}
            height={10}
            style={styles.avatar}
            source={userData?.banner}
          />
        )} */}
        {photos == "" ? (
          <Pressable onPress={pickImage}>
            <UserIcon />
          </Pressable>
        ) : (
          <Image source={photos} />
        )}
        <TextInput
          style={styles.informationInputs}
          placeholder="Name"
          defaultValue={userData.userName}
          onChangeText={(value) =>
            setInputVals({ ...inputVals, userName: value })
          }
          value={inputVals.userName}
        ></TextInput>
        <TextInput
          placeholder="bio"
          style={styles.informationInputs}
          defaultValue={userData.bio}
          onChangeText={(value) => setInputVals({ ...inputVals, bio: value })}
          value={inputVals.bio}
        ></TextInput>
      </View>
      <Pressable onPress={updateUser}>
        <Text style={{ color: "white" }}>edit that damn user please</Text>
      </Pressable>
    </View>
    //   </Modal>
    //   <Pressable
    //     style={[styles.button, styles.buttonOpen]}
    //     onPress={() => setModalVisible(true)}
    //   >
    //     <Text style={styles.textStyle}>Show Modal</Text>
    //   </Pressable>
    // </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "#000000",
    height: "100%",
    width: "100%",
  },
  informationInputs: {
    color: "white",
    borderBlockColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
  },
  avatar: {
    width: "10%",
    height: "10%",
    borderBlockColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    height: 100,
    width: 100,
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
