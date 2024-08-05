import { Button, Pressable, Text, TextInput, View } from "react-native";
import { ErrorMessage, Formik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Yup from "yup";

export function SignUp({ navigation }: { navigation: any }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { setBirthDate, setUserName, setEmail, birthDate } =
    useContext(AuthContext);

  return (
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
            padding: 100,
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

          {/* <RNDateTimePicker
            value={values.birthDate}
            onChange={changeHandler}
            minimumDate={new Date(1910, 0, 1)}
            display="spinner"
            style={{ width: 250 }}
            maximumDate={new Date()}
          /> */}
          {/* <Datetimepicker
            value={values.birthDate}
            onChange={() => handleChange("birthDate")}
            // date={values.birthDate}
            // onDateChange={changeHandler}
            mode="date"
            display="spinner"
          /> */}
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
  );
}
