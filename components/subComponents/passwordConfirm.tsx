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
import { useContext, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { Formik } from "formik";
import { AuthContext } from "@/context/authContext";
import BooklerLogo from "@/assets/images/BooklerLogo";
import { router } from "expo-router";
import { homeTranslation } from "@/localization/translate";
import { LangContext } from "@/context/langContext";
import SeePassIcon from "@/assets/images/SeePassIcon";
import NotSeePassIcon from "@/assets/images/NotSeePassIcon";

export function PasswordConfirm() {
  const { username, email, birthDate, setUser } = useContext(AuthContext);
  const { lang } = useContext(LangContext);
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const [seePasswordOne, setSeePasswordOne] = useState(true);
  const [seePassword, setSeePassword] = useState(true);

  const signUp = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password == values.confirmPassword && values.password) {
      setCanSubmit(false);
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
            following: [],
          })
        );
        setUser(user);
        router.push("./home");
        setCanSubmit(true);
      } catch (error: any) {
        setCanSubmit(true);
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
              <View
                style={{
                  width: "100%",
                  height: "17%",
                  marginBottom: "15%",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: `${
                      errors?.password == undefined || errors?.password == ""
                        ? "rgb(98,101,105)"
                        : "red"
                    }`,
                    justifyContent: "space-between",
                    paddingRight: "5%",
                    marginBottom: 20,
                    paddingLeft: 10,
                    // backgroundColor: "red",
                  }}
                >
                  <TextInput
                    placeholder={homeTranslation[lang]["password"]}
                    // style={[
                    //   styles.input,
                    //   errors.password == undefined || errors.password == ""
                    //     ? { borderColor: "rgb(98,101,105)" }
                    //     : { borderColor: "red" },
                    // ]}
                    style={{
                      height: "auto",
                      paddingBottom: "3%",
                      fontFamily: "Inter",
                      fontSize: 18,
                      fontWeight: "400",
                      color: "rgb(74,153,233)",
                      paddingRight: "20%",
                      width: "90%",
                    }}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={seePassword}
                    onSubmitEditing={() => canSubmit && handleSubmit()}
                  />
                  <Pressable
                    onPress={() => setSeePassword(!seePassword)}
                    style={{
                      width: "10%",
                      height: "100%",
                    }}
                  >
                    {seePassword ? (
                      <NotSeePassIcon style={styles.passVisibilityIcon} />
                    ) : (
                      <SeePassIcon style={styles.passVisibilityIcon} />
                    )}
                  </Pressable>
                  {/* <Text style={{ color: "red" }}>{errors.password}</Text> */}
                </View>
                <Text style={{ color: "red" }}>{errors?.password}</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "17%",
                  marginBottom: "15%",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: `${
                      errors?.confirmPassword == undefined ||
                      errors?.confirmPassword == ""
                        ? "rgb(98,101,105)"
                        : "red"
                    }`,
                    justifyContent: "space-between",
                    paddingRight: "5%",
                    marginBottom: 20,
                    paddingLeft: 10,
                    // backgroundColor: "red",
                  }}
                >
                  <TextInput
                    placeholder={homeTranslation[lang]["confirmPassword"]}
                    style={{
                      height: "auto",
                      paddingBottom: "3%",
                      fontFamily: "Inter",
                      fontSize: 18,
                      fontWeight: "400",
                      color: "rgb(74,153,233)",
                      paddingRight: "20%",
                      width: "90%",
                    }}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    secureTextEntry={seePasswordOne}
                    onSubmitEditing={() => canSubmit && handleSubmit()}
                  />
                  <Pressable
                    onPress={() => setSeePasswordOne(!seePasswordOne)}
                    style={{
                      width: "10%",
                      height: "100%",
                    }}
                  >
                    {seePassword ? (
                      <NotSeePassIcon style={styles.passVisibilityIcon} />
                    ) : (
                      <SeePassIcon style={styles.passVisibilityIcon} />
                    )}
                  </Pressable>
                </View>
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
  passVisibilityIcon: {
    width: "100%",
    height: "100%",
    color: "white",
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
