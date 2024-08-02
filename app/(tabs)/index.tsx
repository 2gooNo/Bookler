
import {
  Image,
  Text,
  StyleSheet,
  Platform,
  View,
  Pressable,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "@/components/subComponents/logIn";
import { SignUp } from "@/components/subComponents/signUp";

function HomeScreen({ navigation }: { navigation: any }) {

  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={{ top: 100, backgroundColor: "pink" }}
      >
        <Text style={{ color: "white", top: 100 }}>oncluf</Text>
      </Pressable>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen} // rreplace with loginAndSignUp page
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Login"
        component={Login} // log in
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SignUp"
        component={SignUp} // sign up page
        options={{ headerShown: false }}
      />
      {/* <HomeStack.Screen
        name="ForgotPassword"
        component={HomeScreen} forgot pass word page 
        options={{ headerShown: false }}
      /> */}
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({});
