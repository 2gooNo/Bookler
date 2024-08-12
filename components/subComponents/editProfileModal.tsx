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
import BannerIcon from "@/assets/images/BannerIcon";

export function EditProfileModal() {
  const { userData } = useContext(AuthContext);
  const [photos, setPhotos] = useState<any>({
    profileUrl: userData?.photoUrl == "" ? "" : userData?.photoUrl,
    profileUri: "",
    bannerUrl: userData?.banner == "" ? "" : userData?.banner,
    bannerUri: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [inputVals, setInputVals] = useState({
    banner: `${userData?.banner}`,
    bio: `${userData?.bio}`,
    photoUrl: `${userData?.photoUrl}`,
    userName: `${userData?.userName}`,
  });

  async function updateUser() {
    const uploadedMedia = [
      photos?.profileUri == ""
        ? photos?.profileUrl
        : await mediaUploader([photos?.profileUri]),
      photos?.bannerUri == ""
        ? photos?.bannerUrl
        : await mediaUploader([photos?.bannerUri]),
    ];
    console.log(uploadedMedia);

    const profilePic = doc(db, "users", userData.userId);

    await updateDoc(profilePic, {
      banner:
        photos?.bannerUri == "" ? userData?.banner : uploadedMedia[1][0].url,
      bio: inputVals.bio,
      photoUrl:
        photos?.profileUri == "" ? userData?.photoUrl : uploadedMedia[0][0].url,
      userName: inputVals.userName,
    });
    console.log("done");
  }
  const pickImage = async (isBanner: boolean) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      // aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result?.assets);
      result?.assets.forEach((image) => {
        if (isBanner) {
          setPhotos({ ...photos, bannerUrl: "", bannerUri: image?.uri });
        } else {
          setPhotos({ ...photos, profileUrl: "", profileUri: image?.uri });
        }
      });
    }
  };
  return (
    <View style={styles.allContainer}>
      <View>
        {photos?.bannerUri == "" && photos?.bannerUrl == "" ? (
          <Pressable onPress={() => pickImage(true)}>
            <BannerIcon />
          </Pressable>
        ) : photos?.bannerUrl == "" ? (
          <Pressable onPress={() => pickImage(true)}>
            <SelectedMedia value={photos?.bannerUri} />
          </Pressable>
        ) : (
          <Pressable onPress={() => pickImage(true)}>
            <Image
              width={100}
              height={100}
              source={{ uri: photos?.bannerUrl }}
            />
          </Pressable>
        )}
        {photos?.profileUri == "" && photos?.profileUrl == "" ? (
          <Pressable onPress={() => pickImage(false)}>
            <UserIcon />
          </Pressable>
        ) : photos?.profileUrl == "" ? (
          <Pressable onPress={() => pickImage(false)}>
            <SelectedMedia value={photos?.profileUri} />
          </Pressable>
        ) : (
          <Pressable onPress={() => pickImage(false)}>
            <Image
              width={100}
              height={100}
              source={{ uri: photos?.profileUrl }}
            />
          </Pressable>
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
