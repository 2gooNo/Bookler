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
      <Formik
        initialValues={{
          userName: "",
          email: "",
          birthDate: new Date(),
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
              placeholder="Email"
              style={{ backgroundColor: "green" }}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <TextInput
              placeholder="User name"
              style={{ backgroundColor: "pink" }}
              onChangeText={handleChange("userName")}
              onBlur={handleBlur("userName")}
              value={values.userName}
            />
            <Text style={{ color: "white" }}>
              {new Date(values.birthDate).toLocaleDateString()}
            </Text>
            <Button
              title="Show Date Picker"
              onPress={() => setDatePickerVisibility(true)}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setFieldValue("birthDate", date);
                setDatePickerVisibility(false);
              }}
              onCancel={() => setDatePickerVisibility(false)}
            />
            <Pressable onPress={() => handleSubmit()}>
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
  },
  upperText: {
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    width: "100%",
    letterSpacing: 1,
    marginBottom: "40%",
  },
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
  xLogo: {
    marginBottom: "35%",
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
