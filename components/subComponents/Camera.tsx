import { PostContext } from "@/context/createPostContext";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type FlashMode = "off" | "on" | "auto";

export function Camera({ navigation }: { navigation: any }) {
  const { setTakenMedia } = useContext(PostContext);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>("off");
  const [cam, setCam] = useState<any>(null);
  const [recording, setRecording] = useState<boolean>(false);
  // if (!permission) {
  //   // Camera permissions are still loading.
  //   return <View style={styles.container} />;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet.
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.message}>
  //         We need your permission to show the camera
  //       </Text>
  //       <Button onPress={requestPermission} title="grant permission" />
  //     </View>
  //   );
  // }

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  });
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // if (hasCameraPermission === null || hasAudioPermission === null) {
  //   return <View />;
  // }
  // if (hasCameraPermission === false || hasAudioPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  const startRecording = async () => {
    console.log("recording");
    let video = await cam?.recordAsync({ mute: false, maxDuration: 5 });
    console.log(video, "==");
    setTakenMedia(video.uri);
    navigation.navigate("PhotoConfirm");
    setRecording(true);
  };
  const takePhoto = async () => {
    const data = await cam?.takePictureAsync(null);
    setTakenMedia(data.uri);
    navigation.navigate("PhotoConfirm");
    setRecording(false);
    // MediaLibrary.createAssetAsync(data.uri);
  };
  const stopRecording = async () => {
    if (recording) {
      let video = await await cam?.current?.stopRecording();
      console.log(video, "--");
    }
  };
  const changeFlash = () => {
    if (flash == "off") {
      setFlash("auto");
    } else if (flash == "auto") {
      setFlash("on");
    } else if (flash == "on") {
      setFlash("off");
    }
  };
  console.log("camera---", cam);
  return (
    <View style={styles.container}>
      <CameraView
        mode="video"
        style={styles.camera}
        facing={facing}
        flash={flash}
        ref={(ref: any) => setCam(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <Pressable
            onLongPress={startRecording}
            onPress={takePhoto}
            onPressOut={stopRecording}
          >
            <Text style={styles.text}>I'm pressable!</Text>
          </Pressable>
          <TouchableOpacity style={styles.button} onPress={changeFlash}>
            <Text style={styles.text}>Flash</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "yellow",
    width: "100%",
    height: "100%",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    // backgroundColor: "yellow",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    flexWrap: "wrap",
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
