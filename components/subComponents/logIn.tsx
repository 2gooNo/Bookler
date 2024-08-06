import BooklerLogo from "@/assets/images/BooklerLogo";
import NotSeePassIcon from "@/assets/images/NotSeePassIcon";
import SeePassIcon from "@/assets/images/SeePassIcon";
import { auth } from "@/common";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import { useState } from "react";
import {
  Pressable,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";

import * as Yup from "yup";

export function Login({ navigation }: { navigation: any }) {
  const [seePassword, setSeePassword] = useState(true);
  const logInWithPassword = (values: any) => {
    console.log(values);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })

      .catch((error) => {
        console.log(error);
        alert(
          "Either your password, email is wrong, Or this account does not exist "
        );
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <View style={styles.allContainer}>
      <BooklerLogo style={styles.xLogo} />
      <Text style={styles.upperText}>
        To get started, first enter your email and password
      </Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
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
            <TextInput
              placeholder="Email"
              onChangeText={handleChange("email")}
              style={styles.input}
              onBlur={handleBlur("email")}
              value={values.email}
            ></TextInput>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: "17%",
                borderBottomWidth: 1,
                borderStyle: "solid",
                borderColor: "rgb(98,101,105)",
                marginBottom: "15%",
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
                placeholder="Password"
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
            <View
              style={{
                width: "100%",
                height: "auto",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 70,
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
                  Forgot password
                </Text>
              </Pressable>
              {/* <Pressable
                style={styles.nextButton}
                onPress={() => handleSubmit()}
              >
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Inter",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Next
                </Text>
              </Pressable> */}
              <Button
                color={"white"}
                title={"next"}
                onPress={() => handleSubmit()}
              ></Button>
            </View>
          </View>
        )}
      </Formik>
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
    marginBottom: "15%",
    color: "rgb(74,153,233)",
  },
  nextButton: {
    backgroundColor: "white",
    paddingBottom: "2%",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
    width: "22%",
    borderRadius: 18,
  },
  passVisibilityIcon: {
    width: "100%",
    height: "100%",
    color: "white",
  },
});
