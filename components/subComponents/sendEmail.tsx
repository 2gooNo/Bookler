import BooklerLogo from "@/assets/images/BooklerLogo";
import { auth } from "@/common";
import { sendPasswordResetEmail } from "firebase/auth";
import { Formik } from "formik";
import {
  Button,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
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
    <View style={styles.allContainer}>
      <BooklerLogo style={styles.xLogo} />
      <Text style={styles.upperText}>Recover your account</Text>
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
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.input}
            />
            <View
              style={{
                width: "100%",
                height: "auto",
                alignItems: "flex-end",
              }}
            >
              <Pressable
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
                  Send email
                </Text>
              </Pressable>
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
    width: "38%",
    borderRadius: 18,
  },
});
