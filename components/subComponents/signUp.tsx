import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Yup from "yup";
import BooklerLogo from "@/assets/images/BooklerLogo";

export function SignUp({ navigation }: { navigation: any }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { setBirthDate, setUserName, setEmail, birthDate } =
    useContext(AuthContext);

  return (
    <View style={styles.allContainer}>
      <BooklerLogo style={styles.xLogo} />
      <Text style={styles.upperText}>Create your account</Text>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          birthDate: "",
        }}
        validationSchema={Yup.object({
          birthDate: Yup.date().required("Birthdate is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          userName: Yup.string().required("Username is required"),
        })}
        onSubmit={(values) => {
          setBirthDate(values?.birthDate);
          setUserName(values?.userName);
          setEmail(values?.email);
          navigation.navigate("PasswordConfirm");
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
                placeholderTextColor="rgb(98,101,105)"
                placeholder="Name"
                style={[
                  styles.input,
                  errors.userName == undefined || errors.userName == ""
                    ? { borderColor: "rgb(98,101,105)" }
                    : { borderColor: "red" },
                ]}
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                value={values.userName}
              />
              <Text style={{ color: "red" }}>{errors.userName}</Text>
            </View>
            <View style={{ marginBottom: "10%", gap: 10 }}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={"rgb(98,101,105)"}
                style={[
                  styles.input,
                  errors.email == undefined || errors.email == ""
                    ? { borderColor: "rgb(98,101,105)" }
                    : { borderColor: "red" },
                ]}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <Text style={{ color: "red" }}>{errors.email}</Text>
            </View>
            <View style={{ marginBottom: "10%", gap: 10 }}>
              <Pressable
                style={[
                  styles.input,
                  errors.birthDate == undefined || errors.birthDate == ""
                    ? { borderColor: "rgb(98,101,105)" }
                    : { borderColor: "red" },
                ]}
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
              <Text style={{ color: "red" }}>{errors.birthDate}</Text>
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setFieldValue("birthDate", date);
                setDatePickerVisibility(false);
              }}
              onCancel={() => setDatePickerVisibility(false)}
            />
            <View
              style={{
                width: "100%",
                height: "auto",
                alignItems: "flex-end",
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
});
