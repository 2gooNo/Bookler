import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { homeTranslation } from "@/localization/translate";
import { LangContext } from "@/context/langContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { PostPage } from "@/components/subComponents/PostPage";
import { FollowingPost } from "@/components/subComponents/FollowingPost";

const CustomHeaderTitle = ({ navigation }: any) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Button
        onPress={() => navigation.navigate("Following")}
        title="Following"
        color="#fff"
      />
      <Button
        onPress={() => navigation.navigate("PostPage")}
        title="For you"
        color={"white"}
      />
    </View>
  );
};

const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.name, navigation);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Following"
        component={FollowingPost}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: () => <CustomHeaderTitle navigation={navigation} />,
          headerTitleAlign: "center",
          headerLeft: () => null,
        })}
      />
      <HomeStack.Screen
        name="PostPage"
        component={PostPage}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: () => <CustomHeaderTitle navigation={navigation} />,
          headerTitleAlign: "center",
          headerLeft: () => null,
        })}
      />
    </HomeStack.Navigator>
  );
}
