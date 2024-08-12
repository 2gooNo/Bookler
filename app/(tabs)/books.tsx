"use client";

import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View, Pressable } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { CreateBook } from "@/components/subComponents/CreateBook";

export function BookCommunities({ navigation }: { navigation: any }) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingTop: "50%",
      }}
    >
      <Pressable
        style={{ backgroundColor: "white", width: "20%", height: "15%" }}
        onPress={() => navigation.navigate("CreateBook")}
      ></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const routeIndex = navigation?.getState()?.routes?.[5].state?.index;
    const shouldHideTabBar = routeIndex === 1;
    navigation.setOptions({
      tabBarStyle: {
        display: shouldHideTabBar ? "none" : "flex",
      },
    });
  }, [navigation, route]);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="BookCommunities"
        component={BookCommunities}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="CreateBook"
        component={CreateBook}
        options={{
          animation: "slide_from_bottom",
          headerShown: false,
          gestureDirection: "vertical",
          presentation: "modal",
        }}
      />
    </HomeStack.Navigator>
  );
}
