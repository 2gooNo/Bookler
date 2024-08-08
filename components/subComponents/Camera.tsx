import { PostContext } from "@/context/createPostContext";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { useContext, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import {
  PinchGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

type FlashMode = "off" | "on" | "auto";

export function Camera({ navigation }: { navigation: any }) {
  const { setTakenMedia } = useContext(PostContext);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePersmission] =
    useMicrophonePermissions();
  const [flash, setFlash] = useState<FlashMode>("off");
  const [cam, setCam] = useState<any>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [zoom, setZoom] = useState(0);
  const pinchRef = useRef(null);
  if (!permission) {
    return <View style={styles.container} />;
  }
  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button
          onPress={() => {
            requestPermission();
          }}
          title="grant permission"
        />
      </View>
    );
  }

  const handlePinch = (event: any) => {
    const { scale } = event.nativeEvent;
    setZoom(Math.max(0, Math.min(scale - 1, 1)));
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const startRecording = async () => {
    requestMicrophonePersmission();
    let video = await cam?.recordAsync({ mute: false, maxDuration: 5 });
    setTakenMedia(video.uri);
    navigation.navigate("PhotoConfirm");
    setRecording(true);
  };
  const takePhoto = async () => {
    const data = await cam?.takePictureAsync(null);
    setTakenMedia(data.uri);
    navigation.navigate("PhotoConfirm");
    setRecording(false);
  };
  const stopRecording = async () => {
    if (recording) {
      await await cam?.current?.stopRecording();
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler ref={pinchRef} onGestureEvent={handlePinch}>
        <CameraView
          zoom={zoom}
          mode="video"
          style={styles.camera}
          facing={facing}
          flash={flash}
          ref={(ref: any) => setCam(ref)}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
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
      </PinchGestureHandler>
    </GestureHandlerRootView>
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
