import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../common/firebase";
import { useContext } from "react";
import { setDoc, doc } from "firebase/firestore";
import { Formik } from "formik";
import { AuthContext } from "@/context/authContext";
import BooklerLogo from "@/assets/images/BooklerLogo";
import { router } from "expo-router";
import { homeTranslation } from "@/localization/translate";
import { LangContext } from "@/context/langContext";

export function PasswordConfirm() {
  const { username, email, birthDate, setUser } = useContext(AuthContext);
  const { lang } = useContext(LangContext);
  const signUp = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password == values.confirmPassword && values.password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          values.password
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: username,
        }).then(() =>
          setDoc(doc(db, "users", user.uid), {
            userId: user.uid,
            userName: username,
            email: email,
            birthDate: birthDate,
            photoUrl: "",
            banner: "",
            favorites: [],
            friends: [],
            books: [],
            bio: "",
            blockedUsers: [],
            defaultLang: "en",
            colorScheme: "dark",
          })
        );
        setUser(user);
        router.push("./home");
      } catch (error: any) {
        console.error(error, "-");
        alert(error.message);
      }
    } else {
      alert(`${homeTranslation[lang]["passwordsDoNotMatch"]}`);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.allContainer}>
        <BooklerLogo style={styles.xLogo} />
        <Text style={styles.upperText}>
          {homeTranslation[lang]["confirmYourPassword"]}
        </Text>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values);
            await signUp(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                height: "auto",
                paddingLeft: "8%",
                paddingRight: "10%",
              }}
            >
              <View style={{ marginBottom: "10%", gap: 10 }}>
                <TextInput
                  placeholder={homeTranslation[lang]["password"]}
                  style={[
                    styles.input,
                    errors.password == undefined || errors.password == ""
                      ? { borderColor: "rgb(98,101,105)" }
                      : { borderColor: "red" },
                  ]}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <Text style={{ color: "red" }}>{errors.password}</Text>
              </View>
              <View style={{ marginBottom: "10%", gap: 10 }}>
                <TextInput
                  placeholder={homeTranslation[lang]["confirmPassword"]}
                  style={[
                    styles.input,
                    errors.confirmPassword == undefined ||
                    errors.confirmPassword == ""
                      ? { borderColor: "rgb(98,101,105)" }
                      : { borderColor: "red" },
                  ]}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                />
                <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "auto",
                  alignItems: "flex-end",
                  position: "relative",
                }}
              >
                <View style={styles.nextButton}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Inter",
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    {homeTranslation[lang]["next"]}
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: "3%",
                    paddingRight: "3%",
                    borderRadius: 18,
                    width: "47%",
                    height: "100%",
                  }}
                >
                  <Button title="" onPress={() => handleSubmit()}></Button>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "black",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    paddingTop: "18%",

    alignItems: "center",
  },
  upperText: {
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    width: "100%",
    letterSpacing: 1,
    marginBottom: "20%",
    paddingLeft: "8%",
  },
  xLogo: {
    marginBottom: "10%",
    width: "10%",
    height: "10%",
  },
  input: {
    height: "auto",
    paddingBottom: "3%",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(98,101,105)",
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "400",
    color: "rgb(74,153,233)",
  },
  nextButton: {
    backgroundColor: "white",
    paddingBottom: "2%",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
    borderRadius: 18,
  },
});
