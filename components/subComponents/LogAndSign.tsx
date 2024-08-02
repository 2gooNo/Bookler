import GoogleLogo from "@/assets/images/GoogleLogo";
import TwitterLogo from "@/assets/images/twitterLogo";
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";

export function LogAndSign() {
  return (
    <View style={styles.allContainer}>
      <TwitterLogo></TwitterLogo>
      <Text style={styles.upperText}>
        See what's happening in the world right now
      </Text>
      <View style={styles.fastLogButtons}>
        <Pressable style={styles.fastLogButton}>
          <GoogleLogo></GoogleLogo>
          <Text>Continue with Google</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "black",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  upperText: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  fastLogButtons: {
    gap: 10,
  },
  fastLogButton: {
    width: "80%",
    height: "10%",
  },
});
