import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/context/authContext";
import { LangProvider } from "@/context/langContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, Text } from "react-native";
import { CreatePostProvider } from "@/context/createPostContext";
import { Postprovider } from "@/context/postContext";
import Toast from "react-native-toast-message";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <LangProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <CreatePostProvider>
            <Postprovider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen
                  name="details/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="otherProfile/[userId]"
                  options={{
                    headerShown: false,
                    gestureDirection: "horizontal",
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen
                  name="draftPage/[userId]"
                  options={({ navigation }) => ({
                    headerTitle: () => (
                      <Text
                        style={{
                          color: "#e8e6e4",
                          fontSize: 17,
                          fontWeight: "500",
                        }}
                      >
                        Draft
                      </Text>
                    ),
                    headerLeft: () => (
                      <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={20} color="white" />
                      </Pressable>
                    ),
                    headerShown: true,
                    gestureDirection: "horizontal",
                    animation: "slide_from_right",
                  })}
                />
                <Stack.Screen
                  name="favorites/[userId]"
                  options={({ navigation }) => ({
                    headerTitle: () => (
                      <Text
                        style={{
                          color: "#e8e6e4",
                          fontSize: 17,
                          fontWeight: "500",
                        }}
                      >
                        Favorites
                      </Text>
                    ),
                    headerLeft: () => (
                      <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={20} color="white" />
                      </Pressable>
                    ),
                    headerShown: true,
                    gestureDirection: "horizontal",
                    animation: "slide_from_right",
                  })}
                />
                <Stack.Screen
                  name="commentPage/[postId]"
                  options={({ navigation }) => ({
                    headerTitle: () => "",
                    headerLeft: () => (
                      <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={20} color="white" />
                      </Pressable>
                    ),
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                    animation: "slide_from_right",
                  })}
                />
              </Stack>
            </Postprovider>
          </CreatePostProvider>
        </ThemeProvider>
      </LangProvider>
    </AuthProvider>
  );
}
