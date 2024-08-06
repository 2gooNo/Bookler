import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../common/firebase";
import { useContext } from "react";
import { setDoc, doc } from "firebase/firestore";
import { Formik } from "formik";
import { AuthContext } from "@/context/authContext";
import BooklerLogo from "@/assets/images/BooklerLogo";
import { router } from "expo-router";

export function PasswordConfirm() {
  const { username, email, birthDate } = useContext(AuthContext);
  const signUp = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    console.log(
      values.password == values.confirmPassword,
      username,
      email,
      birthDate,
      values.confirmPassword,
      values
    );
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
          photoURL:
            "https://nestcore-my.sharepoint.com/:i:/g/personal/24hp0317_nest_edu_mn/Ee1NrTdhXkdKp0hTe772thIBnSYMc49xd4xomsNuuHkEzQ?e=12hgEQ",
        }).then(() =>
          setDoc(doc(db, "users", user.uid), {
            userId: user.uid,
            userName: username,
            email: email,
            birthDate: birthDate,
            photoUrl:
              "https://nestcore-my.sharepoint.com/:i:/g/personal/24hp0317_nest_edu_mn/Ee1NrTdhXkdKp0hTe772thIBnSYMc49xd4xomsNuuHkEzQ?e=12hgEQ",
            banner: "",
            favorites: [],
            friends: [],
            books: [],
            description: "",
            blockedUsers: [],
          })
        );
        router.push("./home");
      } catch (error: any) {
        console.error(error, "-");
        alert(error.message);
      }
    } else {
      alert("Passwords do not match");
    }
  };
  return (
    <View style={styles.allContainer}>
      <BooklerLogo style={styles.xLogo} />
      <Text style={styles.upperText}>Confirm your password</Text>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          await signUp(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
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
              placeholder="Password"
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
            />
            <View
              style={{
                width: "100%",
                height: "auto",
                alignItems: "flex-end",
                backgroundColor: "red",
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
                  Next
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
                  width: "22%",
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
    width: "100%",
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
    borderRadius: 18,
  },
});
