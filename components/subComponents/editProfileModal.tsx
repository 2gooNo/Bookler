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
} from "react-native";

import GestureRecognizer from "react-native-swipe-gestures";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/common";
import { AuthContext } from "@/context/authContext";

export function EditProfileModal() {
  const { userData } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [inputVals, setInputVals] = useState({
    banner: `${userData?.banner}`,
    bio: `${userData?.bio}`,
    photoUrl: `${userData?.photoUrl}`,
    userName: `${userData?.userName}`,
  });

  async function updateUser() {
    const profilePic = doc(db, "users", userData.userId);

    await updateDoc(profilePic, {
      // banner: inputVals.banner,
      bio: inputVals.bio,
      // photoUrl: inputVals.photoUrl,
      userName: inputVals.userName,
    });
    console.log("done");
  }

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
        {userData?.banner == "" ? (
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
        )}
        {userData.photoUrl == "" ? (
          <UserIcon />
        ) : (
          <Image
            width={10}
            height={10}
            style={styles.avatar}
            source={userData.photoUrl}
          />
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
