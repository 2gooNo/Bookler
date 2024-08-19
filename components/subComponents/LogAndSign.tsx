import AppleLogo from "@/assets/images/AppleLogo";
import GoogleLogo from "@/assets/images/GoogleLogo";
import BooklerLogo from "@/assets/images/BooklerLogo";
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import { homeTranslation } from "@/localization/translate";
import { useContext } from "react";
import { LangContext } from "@/context/langContext";

export function LogAndSign({ navigation }: any) {
  const { lang } = useContext(LangContext);
  return (
    <View style={styles.allContainer}>
      <BooklerLogo style={styles.xLogo} />
      <Text style={styles.upperText}>
        {homeTranslation?.[lang]?.["upperText"]}
      </Text>
      <View style={styles.choiseSection}>
        <Pressable style={styles.fastLogButton}>
          <GoogleLogo style={styles.fastLogLogo}></GoogleLogo>
          <Text style={styles.fastLogText}>
            {homeTranslation[lang]["signGoogle"]}
          </Text>
        </Pressable>
        <Pressable style={styles.fastLogButton}>
          <AppleLogo style={styles.fastLogLogo}></AppleLogo>
          <Text style={styles.fastLogText}>
            {homeTranslation[lang]["signApple"]}
          </Text>
        </Pressable>

        <View style={styles.orContainer}>
          <View style={styles.grayLine}></View>
          <Text style={styles.orText}>or</Text>
          <View style={styles.grayLine}></View>
        </View>
        <Pressable
          onPress={() => navigation.navigate(`SignUp`)}
          style={styles.fastLogButton}
        >
          <Text style={styles.fastLogText}>
            {homeTranslation[lang]["createAccount"]}
          </Text>
        </Pressable>
        <View style={styles.logInTextContainer}>
          <Text style={styles.orText}>
            {homeTranslation[lang]["alreadyHaveAcc"]}
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.logInText}>
              {homeTranslation[lang]["logIn"]}
            </Text>
          </Pressable>
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
    paddingTop: "18%",
    alignItems: "center",
    paddingLeft: "8%",
    paddingRight: "8%",
  },
  upperText: {
    fontFamily: "Inter",
    fontSize: 27,
    fontWeight: "800",
    color: "white",
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
    height: "8%",
    backgroundColor: "white",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  xLogo: {
    width: "20%",
    height: "20%",
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
    height: "auto",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  grayLine: {
    height: "10%",
    width: "43%",
    borderColor: " rgb(136,138,141)",
    borderStyle: "solid",
    borderWidth: 1,
  },
  choiseSection: {
    width: "100%",
    height: "100%",
    position: "relative",
    gap: 10,
  },
  orText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
    color: " rgb(136,138,141)",
  },
  logInTextContainer: {
    marginTop: "8%",
    flexDirection: "row",
    gap: 5,
  },
  logInText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
    color: " rgb(74,152,232)",
  },
});
