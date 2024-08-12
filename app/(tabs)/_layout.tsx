import { Tabs } from "expo-router";
import React, { useContext, useEffect, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/context/authContext";
import { PostProvider } from "@/context/createPostContext";
import { LangContext, LangProvider } from "@/context/langContext";
import { homeTranslation } from "@/localization/translate";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { lang } = useContext(LangContext);

  return (
    <AuthProvider>
      <PostProvider>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarLabel: () => {
              return null;
            },
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarStyle: {
              display:
                route.name === "index" || "createPost" == route.name
                  ? "none"
                  : "flex",
              backgroundColor: "black",
              paddingTop: 5,
            },
            tabBarButton: ["index"].includes(route.name)
              ? () => {
                  return null;
                }
              : undefined,
          })}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarStyle: { display: "none" },
            }}
          />
          <Tabs.Screen
            name="home"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="books"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "book" : "book-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="createPost"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  size={30}
                  name={focused ? "add" : "add-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="inbox"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "mail" : "mail-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name={`profile`}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "person" : "person-outline"}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </PostProvider>
    </AuthProvider>
  );
}
