import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import { ErrorMessage, Formik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Yup from "yup";
import XLogo from "@/assets/images/XLogo";

export function SignUp({ navigation }: { navigation: any }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { setBirthDate, setUserName, setEmail, birthDate } =
    useContext(AuthContext);

  return (
    <View style={styles.allContainer}>
      <XLogo style={styles.xLogo} />
      <Text style={styles.upperText}>Create your account</Text>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          birthDate: "",
        }}
        validationSchema={Yup.object({
          birthDate: Yup.date().required("Birthdate is required"),
        })}
        onSubmit={(values) => {
          console.log(values.birthDate);
          navigation.navigate("PasswordConfirm");
          setBirthDate(values?.birthDate);
          setUserName(values?.userName);
          setEmail(values?.email);
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
            }}
          >
            <TextInput
              placeholderTextColor="rgb(98,101,105)"
              placeholder="Name"
              style={styles.input}
              onChangeText={handleChange("userName")}
              onBlur={handleBlur("userName")}
              value={values.userName}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={"rgb(98,101,105)"}
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <Pressable
              style={styles.input}
              onPress={() => setDatePickerVisibility(true)}
            >
              <Text
                style={{
                  color:
                    values?.birthDate == ""
                      ? `rgb(98,101,105)`
                      : "rgb(74,153,233)",
                  fontSize: 18,
                }}
              >
                {values?.birthDate == ""
                  ? "Date of birth"
                  : new Date(values.birthDate).toLocaleDateString()}
              </Text>
            </Pressable>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setFieldValue("birthDate", date);
                setDatePickerVisibility(false);
              }}
              onCancel={() => setDatePickerVisibility(false)}
            />
            <Pressable style={styles.nextButton} onPress={() => handleSubmit()}>
              <Text style={{ color: "white" }}>Sign in</Text>
            </Pressable>
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
    paddingLeft: "8%",
    paddingRight: "10%",
  },
  upperText: {
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    width: "100%",
    letterSpacing: 1,
    marginBottom: "20%",
  },
  xLogo: {
    marginBottom: "10%",
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
  nextButton: {},
  fastLogButtons: {
    gap: 10,
    width: "100%",
    height: "auto",
  },

  fastLogButton: {
    width: "100%",
    height: "8%",
    backgroundColor: "white",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },

  fastLogLogo: {
    width: "10%",
    height: "60%",
  },
  fastLogText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 15,
  },
  orContainer: {
    flexDirection: "row",
    width: "100%",
    height: "auto",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  grayLine: {
    height: "10%",
    width: "43%",
    borderColor: " rgb(136,138,141)",
    borderStyle: "solid",
    borderWidth: 1,
  },
  choiseSection: {
    width: "100%",
    height: "100%",
    position: "relative",
    gap: 10,
  },
  orText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
    color: " rgb(136,138,141)",
  },
  logInTextContainer: {
    marginTop: "8%",
    flexDirection: "row",
    gap: 5,
  },
  logInText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
    color: " rgb(74,152,232)",
  },
});
