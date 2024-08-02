import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../common /index";
import { useContext, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { Button, Pressable, Text, View } from "react-native";
import { Formik } from "formik";

export function SignUp() {
  const signUp = (values: any) => {
    console.log(values);
    // createUserWithEmailAndPassword(auth, values.email, values.password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;

    //     updateProfile(user, {
    //       displayName: values.username,
    //       photoURL:
    //         "https://nestcore-my.sharepoint.com/:i:/g/personal/24hp0317_nest_edu_mn/Ee1NrTdhXkdKp0hTe772thIBnSYMc49xd4xomsNuuHkEzQ?e=12hgEQ",
    //     })
    //       .then(() => {
    //         // console.log("Yipeee");
    //       })
    //       .catch((error: any) => {
    //         // console.log(error);
    //       });
    //     try {
    //     } catch (e) {
    //       // console.log(e);
    //     }
    //   })
    //   .catch((error: any) => {
    //     // alert(
    //     //   "Your email is not a valid email, or this email is already in use"
    //     // );
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
  };
  return (
    <Formik
      initialValues={{ email: "", userName: " ", birthDate: "" }}
      onSubmit={(values) => signUp({ values })}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View
          style={{
            position: "relative",
            width: "100%",
            paddingVertical: 30,
            justifyContent: "center",
          }}
        >
          <Text> </Text>
          <Button title="Next" onPress={() => console.log("o")}></Button>
        </View>
      )}
    </Formik>
  );
}
