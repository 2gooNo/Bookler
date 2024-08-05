import { Button, Text, View, TextInput } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../common/firebase";
import { useContext } from "react";
import { setDoc, doc } from "firebase/firestore";
import { Formik } from "formik";
import { AuthContext } from "@/context/authContext";

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
      } catch (error: any) {
        console.error(error, "-");
        alert(error.message);
      }
    } else {
      alert("Passwords do not match");
    }
  };
  return (
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
            position: "relative",
            width: "100%",
            paddingVertical: 30,
            justifyContent: "center",
          }}
        >
          <TextInput
            placeholder="Password"
            style={{ backgroundColor: "green", marginTop: 100 }}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          <TextInput
            placeholder="Confirm Password"
            style={{ backgroundColor: "green", marginTop: 100 }}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
          />
          <Text style={{ color: "white" }}>{values.confirmPassword}</Text>
          <Button title="Next" onPress={() => handleSubmit()}></Button>
        </View>
      )}
    </Formik>
  );
}
