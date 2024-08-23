import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { homeTranslation } from "@/localization/translate";
import { LangContext } from "@/context/langContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { PostPage } from "@/components/subComponents/PostPage";
import { FollowingPost } from "@/components/subComponents/FollowingPost";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const CustomHeaderTitle = ({ navigation, index }: any) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Button
        onPress={() => navigation.navigate("PostPage")}
        title="For you"
        color={index == 0 || !index ? "white" : "grey"}
      />
      <Button
        onPress={() => navigation.navigate("Following")}
        title="Following"
        color={index == 1 ? "white" : "grey"}
      />
    </View>
  );
};

const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen() {
  const navigationUsed = useNavigation();
  const route = useRoute();
  const index = navigationUsed.getState()?.routes?.[1]?.state?.index;
  const state = navigationUsed.getState();

  const handlePress = () => {
    const previousRoutes = state.history || [];

    // if (previousRoutes.length > 1) {
    // navigationUsed.goBack();

    if (navigationUsed.canGoBack()) {
      navigationUsed.goBack();
    }

    // }
  };
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="PostPage"
        component={PostPage}
        options={({ navigation }) => ({
          gestureEnabled: true,
          gestureDirection: "horizontal",
          animation: "slide_from_left",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: () => "",
          headerTitleAlign: "center",
          headerLeft: () => (
            <CustomHeaderTitle navigation={navigation} index={index} />
          ),
        })}
      />

      <HomeStack.Screen
        name="Following"
        component={FollowingPost}
        options={({ navigation }) => ({
          gestureEnabled: true,
          gestureDirection: "horizontal",
          animation: "slide_from_right",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: () => "",
          headerTitleAlign: "center",
          headerLeft: () => (
            <CustomHeaderTitle navigation={navigation} index={index} />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
}
