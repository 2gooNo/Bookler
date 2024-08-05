import { Formik } from "formik";
import { View } from "react-native";
import * as Yup from "yup";

export function Login() {
  const searchForUser = (values: any) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={{
        searchForUserValue: "",
      }}
      validationSchema={Yup.object({
        birthDate: Yup.date().required("Email is required"),
      })}
      onSubmit={(values) => {
        searchForUser(values);
      }}
    >
      <View></View>
    </Formik>
  );
}
