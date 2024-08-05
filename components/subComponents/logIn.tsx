import { auth } from "@/common";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import { useState } from "react";
import { Pressable, View, TextInput, Text, Button } from "react-native";

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
        <View style={{ padding: 100 }}>
          <TextInput
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          ></TextInput>
          <TextInput
            style={{ backgroundColor: "green" }}
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry={seePassword}
          ></TextInput>
          <Pressable
            onPress={() => setSeePassword(!seePassword)}
            style={{
              backgroundColor: "yellow",
              width: "100%",
              height: 50,
              bottom: 0,
            }}
          >
            <Text> see password</Text>
          </Pressable>
          <Pressable
            onPress={() => handleSubmit()}
            style={{
              backgroundColor: "pink",
              width: "100%",
              height: 100,
              bottom: 0,
            }}
          ></Pressable>
          <Button
            title={"forgot password?"}
            onPress={() => navigation.navigate("SendEmail")}
          ></Button>
        </View>
      )}
    </Formik>
  );
}
