import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable } from "react-native";

import GestureRecognizer from "react-native-swipe-gestures";

export function EditProfileModal() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <GestureRecognizer
      style={{ flex: 1 }}
      // onSwipeUp={() => setModalVisible(true)}
      onSwipeDown={() => setModalVisible(false)}
    >
      <Modal
        animationType="slide"
        presentationStyle="formSheet"
        visible={modalVisible}
      >
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.textStyle}>Close Modal</Text>
        </Pressable>
        <Text style={styles.textStyle}>Swipe Down Please</Text>
        {/* 
        en dotor edit profile yum hiih 
        bas dooshoo scroll hiij close hiij boln
        */}
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
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
