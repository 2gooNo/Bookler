"use client";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Platform,
  View,
  Pressable,
  Dimensions,
  TextInput,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateBook } from "@/components/subComponents/CreateBook";
import BackIcon from "@/assets/images/BackIcon";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "@/common";

export function BookCommunities({ navigation }: { navigation: any }) {
  const [bookData, setBookData] = useState<any>([]);
  useEffect(() => {
    const q = query(collection(db, "books"));

    onSnapshot(q, async (snapshot) => {
      const userPromises = snapshot.docs.map((postDoc) => {
        // if (!bookData) {
        //   setBookData(postDoc?.data());
        // } else {
        //   setBookData((prev: any) => [...prev, postDoc.data()]);
        // }
        setBookData((prev: any) => [...prev, postDoc.data()]);
      });
    });
  }, []);

  console.log(
    bookData[1]?.chapters?.map((chapter: any) => {
      chapter;
    }),
    "++++++++++"
  );

  return (
    <View style={styles.allContainer}>
      <View
        style={{
          width: "100%",
          paddingRight: "5%",
          height: "5.5%",
          paddingLeft: "2%",
          gap: 30,
          flexDirection: "row",
          marginBottom: "10%",
        }}
      >
        <BackIcon style={styles.icon} />
        <TextInput
          placeholder="Search for a Book"
          placeholderTextColor="rgb(115,120,124)"
          style={{
            borderRadius: 35,
            backgroundColor: "rgb(33,35,40)",
            width: "85%",
            paddingLeft: "20%",
            fontFamily: "Inherit",
            fontSize: 18,
            fontWeight: "500",
            color: "white",
          }}
        />
      </View>
      <View style={{ width: "100%", height: "40%" }}>
        {bookData?.map((book: any, index: number) => (
          <View
            style={{
              width: "100%",
              height: "30%",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 15,
            }}
            key={index}
          >
            <Image
              style={{ width: "23%", height: "85%", borderRadius: 10 }}
              source={{ uri: book?.bookImg }}
            />
            <View style={{ gap: 5 }}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "inherit",
                  fontSize: 20,
                  fontStyle: "normal",
                  fontWeight: "600",
                }}
              >
                {book?.name}
              </Text>
              {/* {book?.chapters?.map((chapter: any, index: number) => (
                <Text key={index} style={{ color: "white" }}>
                  {chapter}
                </Text>
              ))} */}
              <Text
                style={{
                  color: "rgb(117,122,125)",
                  fontFamily: "inherit",
                  fontSize: 16,
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
              >
                {book?.chapters.length} chapters
              </Text>
            </View>
          </View>
        ))}
      </View>
      {/* <Pressable
        style={{ backgroundColor: "white", width: "20%", height: "15%" }}
        onPress={() => navigation.navigate("CreateBook")}
      ></Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "black",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    paddingTop: "12%",
    paddingLeft: "3%",
    paddingRight: "3%",
    position: "relative",
  },
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
  icon: {
    width: "8%",
    height: "100%",
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
