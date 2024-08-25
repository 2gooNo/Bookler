import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "@/components/subComponents/logIn";
import { SignUp } from "@/components/subComponents/signUp";
import { LogAndSign } from "@/components/subComponents/LogAndSign";
import { PasswordConfirm } from "@/components/subComponents/passwordConfirm";
import { SendEmailToUser } from "@/components/subComponents/ForgotPassword";
import { auth } from "@/common";
import { useEffect, useState } from "react";
import { router } from "expo-router";

const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          router.push("./home");
        } else {
          setLoading(false);
        }
      },
      (error) => {
        alert(error);
      }
    );
  }, [auth.currentUser]);
  if (!loading) {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="LogAndSign"
          component={LogAndSign}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="PasswordConfirm"
          component={PasswordConfirm}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="SendEmail"
          component={SendEmailToUser}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    );
  }
}
const styles = StyleSheet.create({});
