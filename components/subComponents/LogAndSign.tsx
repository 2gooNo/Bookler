import AppleLogo from "@/assets/images/AppleLogo";
import GoogleLogo from "@/assets/images/GoogleLogo";
import XLogo from "@/assets/images/XLogo";
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";

export function LogAndSign() {
  return (
    <View style={styles.allContainer}>
      <XLogo style={styles.xLogo}></XLogo>
      <Text style={styles.upperText}>
        See what's happening in the world right now
      </Text>
      <View style={styles.choiseSection}>
        <View style={styles.fastLogButtons}>
          <Pressable style={styles.fastLogButton}>
            <GoogleLogo style={styles.fastLogLogo}></GoogleLogo>
            <Text style={styles.fastLogText}>Continue with Google</Text>
          </Pressable>
          <Pressable style={styles.fastLogButton}>
            <AppleLogo style={styles.fastLogLogo}></AppleLogo>
            <Text style={styles.fastLogText}>Continue with Google</Text>
          </Pressable>
        </View>
        <View style={styles.orContainer}>
          <View style={styles.grayLine}></View>
          <Text style={styles.orText}>or</Text>
          <View style={styles.grayLine}></View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "black",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    paddingTop: "10%",
    alignItems: "center",
    paddingLeft: "8%",
    paddingRight: "8%",
  },
  upperText: {
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    width: "100%",
    letterSpacing: 1,
    marginBottom: "40%",
  },
  fastLogButtons: {
    gap: 10,
    width: "100%",
    height: "auto",
  },
  fastLogButton: {
    width: "100%",
    height: "18%",
    backgroundColor: "white",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "20%",
    gap: 25,
  },
  xLogo: {
    marginBottom: "40%",
  },
  fastLogLogo: {
    width: "10%",
    height: "60%",
  },
  fastLogText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 15,
  },
  orContainer: {
    flexDirection: "row",
    width: "100%",
    height: 1,
    position: "absolute",
    top: "19%",
    color: "rgb(46,48,51)",
  },
  grayLine: {
    height: "10%",
    width: "40%",
    borderColor: "rgb(46,48,51)",
    borderStyle: "solid",
    borderWidth: 1,
  },
  choiseSection: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  orText: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "900",
  },
});
