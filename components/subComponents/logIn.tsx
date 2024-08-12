import BooklerLogo from "@/assets/images/BooklerLogo";
import NotSeePassIcon from "@/assets/images/NotSeePassIcon";
import SeePassIcon from "@/assets/images/SeePassIcon";
import { auth } from "@/common";
import { AuthContext } from "@/context/authContext";
import { LangContext } from "@/context/langContext";
import { homeTranslation } from "@/localization/translate";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import { useContext, useState } from "react";
import {
  Pressable,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import * as Yup from "yup";

export function Login({ navigation }: { navigation: any }) {
  const { setUser } = useContext(AuthContext);
  const { lang } = useContext(LangContext);
  const [seePassword, setSeePassword] = useState(true);
  const logInWithPassword = (values: any) => {
    console.log(values);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        router.push("./home");
      })

      .catch((error) => {
        console.log(error);
        alert(
          `${homeTranslation[lang]["eitherYourPasswordEmailIsWrongOrThisAccountDoesNotExist"]}`
        );
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.allContainer}>
        <BooklerLogo style={styles.xLogo} />
        <Text style={styles.upperText}>
          {homeTranslation[lang]["toGetStartedFirstEnterYourEmailAndPassword"]}
        </Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email(`${homeTranslation[lang]["invalidEmail"]}`)
              .required(`${homeTranslation[lang]["emailIsRequired"]}`),
            password: Yup.string().required(
              `${homeTranslation[lang]["passwordIsRequired"]}`
            ),
          })}
          onSubmit={(values) => {
            logInWithPassword(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            errors,
            values,
          }) => (
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
                  keyboardType="email-address"
                  placeholder={homeTranslation[lang]["email"]}
                  onChangeText={handleChange("email")}
                  style={[
                    styles.input,
                    errors.email == undefined || errors.email == ""
                      ? { borderColor: "rgb(98,101,105)" }
                      : { borderColor: "red" },
                  ]}
                  onBlur={handleBlur("email")}
                  value={values.email}
                ></TextInput>
                <Text style={{ color: "red" }}>{errors.email}</Text>
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
                      errors.password == undefined || errors.password == ""
                        ? "rgb(98,101,105)"
                        : "red"
                    }`,

                    justifyContent: "space-between",
                    paddingRight: "5%",
                  }}
                >
                  <TextInput
                    style={{
                      height: "auto",
                      paddingBottom: "3%",
                      fontFamily: "Inter",
                      fontSize: 18,
                      fontWeight: "400",
                      color: "rgb(74,153,233)",
                      paddingRight: "20%",
                    }}
                    placeholder={homeTranslation[lang]["password"]}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={seePassword}
                  ></TextInput>

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
                </View>
                <Text style={{ color: "red" }}>{errors.password}</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "auto",
                  alignItems: "center",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <Pressable onPress={() => navigation.navigate("SendEmail")}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Inter",
                      fontSize: 18,
                      fontWeight: "400",
                    }}
                  >
                    {homeTranslation[lang]["forgotPassword"]}
                  </Text>
                </Pressable>
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
                    left: 0,
                    top: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: "3%",
                    paddingRight: "3%",
                    borderRadius: 18,
                    height: "100%",
                    width: "47%",
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
  passVisibilityIcon: {
    width: "100%",
    height: "100%",
    color: "white",
  },
});
