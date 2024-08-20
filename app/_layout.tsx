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
import { Pressable } from "react-native";

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
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="details/[id]"
              options={{ headerShown: false }}
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
        </ThemeProvider>
      </LangProvider>
    </AuthProvider>
  );
}
