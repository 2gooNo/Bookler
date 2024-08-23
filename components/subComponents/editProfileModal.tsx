import UserIcon from "@/assets/images/UserIcon";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { doc, updateDoc } from "firebase/firestore";
// import { Image } from "expo-image";
import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { mediaUploader } from "@/utils/image-uploader";
import { router } from "expo-router";
import { SelectedMedia } from "./SelectedMedia";
import BannerIcon from "@/assets/images/BannerIcon";
import UploadImgIcon from "@/assets/images/UploadImageIcon";

export function EditProfileModal() {
  const { userData } = useContext(AuthContext);
  const [photos, setPhotos] = useState<any>({
    profileUrl: userData?.photoUrl == "" ? "" : userData?.photoUrl,
    bannerUrl: userData?.banner == "" ? "" : userData?.banner,
  });
  const [inputVals, setInputVals] = useState({
    banner: `${userData?.banner}`,
    bio: `${userData?.bio}`,
    photoUrl: `${userData?.photoUrl}`,
    userName: `${userData?.userName}`,
  });

  async function updateUser() {
    if (photos?.profileUrl && photos?.bannerUrl) {
      console.log(
        "1",
        await mediaUploader([photos?.profileUrl, photos?.bannerUrl])
      );
      // console.log(await mediaUploader([photos?.bannerUrl]));
    } else if (photos?.profileUr) {
      console.log("2", await mediaUploader([photos?.profileUrl]));
    } else if (photos?.bannerUrl) {
      console.log("3", await mediaUploader([photos?.bannerUrl]));
    }
    // console.log("2");
    // const profilePic = doc(db, "users", userData?.userId);
    // console.log("3");
    // await updateDoc(profilePic, {
    //   banner: uploadedImages[1] == "" ? "" : uploadedImages[1][0]?.url,
    //   bio: inputVals?.bio,
    //   photoUrl: uploadedImages[0] == "" ? "" : uploadedImages[0][0]?.url,
    //   userName: inputVals?.userName,
    // });
    // console.log("done");
    // router.navigate("/profile");
  }
  const pickImage = async (isBanner: boolean) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      quality: 1,
    });
    if (!result.canceled) {
      if (isBanner) {
        setPhotos({
          ...photos,
          bannerUrl: result?.assets?.[0]?.uri,
        });
      } else {
        setPhotos({
          ...photos,
          profileUrl: result?.assets?.[0]?.uri,
        });
      }
    }
  };
  return (
    <View style={styles.allContainer}>
      <View
        style={{
          height: "5%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <Pressable
          style={{ position: "absolute", left: "5%" }}
          onPress={() => router.back()}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Inherit",
              fontSize: 19,
              fontWeight: "500",
            }}
          >
            Cancel
          </Text>
        </Pressable>
        <Text
          style={{
            fontFamily: "Inherit",
            fontSize: 20,
            fontWeight: "700",
            color: "white",
          }}
        >
          Edit profile
        </Text>
        <Pressable
          style={{
            marginLeft: "10%",
            position: "absolute",
            right: "5%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            width: 70,
          }}
          onPress={updateUser}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Inherit",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Save
          </Text>
        </Pressable>
      </View>
      {photos?.bannerUrl == "" ? (
        <Pressable onPress={() => pickImage(true)}>
          <BannerIcon />
        </Pressable>
      ) : (
        <Pressable
          style={{ height: "18%", width: "100%" }}
          onPress={() => pickImage(true)}
        >
          <Image style={styles.banner} source={{ uri: photos?.bannerUrl }} />
        </Pressable>
      )}

      {photos?.profileUrl == "" ? (
        <Pressable onPress={() => pickImage(false)}>
          <UserIcon />
        </Pressable>
      ) : (
        <Pressable
          style={{
            height: "10%",
            top: "19.5%",
            position: "absolute",
            left: "3%",
            width: "22%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => pickImage(false)}
        >
          <UploadImgIcon style={styles.uploadIcon} />
          <Image
            style={styles.profileImg}
            source={{ uri: photos?.profileUrl }}
          />
        </Pressable>
      )}
      <View style={styles.inputs}>
        <View
          style={{
            flexDirection: "row",
            gap: 45,
            width: "100%",
            paddingLeft: "3%",
            borderTopColor: "rgb(66, 67, 68)",
            borderWidth: 1,
            borderStyle: "solid",
            paddingTop: "3%",
            paddingBottom: "1%",
          }}
        >
          <Text
            style={{
              fontFamily: "Inherit",
              fontSize: 17,
              fontWeight: "700",
              color: "white",
            }}
          >
            Name
          </Text>
          <TextInput
            style={styles.informationInputs}
            placeholder="Add your name"
            placeholderTextColor="rgb(131, 135, 138)"
            defaultValue={userData.userName}
            onChangeText={(value) =>
              setInputVals({ ...inputVals, userName: value })
            }
            value={inputVals.userName}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 45,
            width: "100%",
            paddingLeft: "3%",
            borderTopColor: "rgb(66, 67, 68)",
            borderBottomColor: "rgb(66, 67, 68)",
            borderWidth: 1,
            borderStyle: "solid",
            paddingTop: "3%",
            paddingBottom: "3%",
          }}
        >
          <Text
            style={{
              fontFamily: "Inherit",
              fontSize: 17,
              fontWeight: "700",
              color: "white",
              width: "12%",
            }}
          >
            Bio
          </Text>
          <TextInput
            placeholder="Add a bio to your profile"
            placeholderTextColor="rgb(131, 135, 138)"
            style={styles.informationInputs}
            defaultValue={userData.bio}
            onChangeText={(value) => setInputVals({ ...inputVals, bio: value })}
            value={inputVals.bio}
          ></TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "#000000",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "relative",
    alignItems: "center",
  },
  informationInputs: {
    color: "rgb(94, 163, 234)",
    fontSize: 17,
    width: "70%",
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
  uploadIcon: {
    width: "40%",
    height: "40%",
    zIndex: 9,
  },
  banner: {
    width: "100%",
    height: "100%",
    marginBottom: "10%",
  },
  profileImg: {
    width: "100%",
    height: "100%",
    borderColor: "black",
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 4,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  inputs: { width: "100%", marginTop: "18%", gap: 10 },
});
