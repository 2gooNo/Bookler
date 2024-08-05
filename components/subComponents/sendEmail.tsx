import { auth } from "@/common";
import { sendPasswordResetEmail } from "firebase/auth";
import { Formik } from "formik";
import { Button, TextInput, View } from "react-native";
import * as Yup from "yup";

export function SendEmailToUser() {
  const sendEmail = (values: any) => {
    console.log(values);
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        alert("an email has been sent to this email ");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("this email is invalid");
      });
  };
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
      })}
      onSubmit={(values) => {
        sendEmail(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
        <View style={{ padding: 100 }}>
          <TextInput
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          <Button
            onPress={() => handleSubmit()}
            title={"reset password"}
          ></Button>
        </View>
      )}
    </Formik>
  );
}
