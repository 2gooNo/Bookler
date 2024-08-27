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
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateBook } from "@/components/subComponents/CreateBook";
import BackIcon from "@/assets/images/BackIcon";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/common";
import BookDetail from "@/components/subComponents/BookCommunity";
export function BookCommunities({ navigation }: { navigation: any }) {
  const [bookData, setBookData] = useState<Array<any>>([]);
  useEffect(() => {
    const q = query(collection(db, "books"));
    onSnapshot(q, async (snapshot) => {
      const userPromises = snapshot.docs.map((postDoc) => {
        setBookData((prev: any) => [...prev, [postDoc.data(), postDoc.id]]);
      });
    });
  }, []);

  return (
    <ScrollView
      horizontal={false}
      style={styles.allContainer}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          width: "100%",
          paddingRight: "5%",
          height: 50,
          paddingLeft: "2%",
          gap: 30,
          flexDirection: "row",
          marginBottom: "10%",
        }}
      >
        <TextInput
          placeholder="Search for a Book"
          textAlign="left"
          placeholderTextColor="rgb(115,120,124)"
          style={{
            borderRadius: 35,
            backgroundColor: "rgb(33,35,40)",
            width: "100%",
            height: 50,
            paddingHorizontal: 15,
            fontFamily: "Inherit",
            fontSize: 16,
            fontWeight: "400",
            color: "white",
          }}
        />
      </View>
      <View style={{ width: "100%", gap: 30 }}>
        {bookData?.map((book: any, index: number) => (
          <Pressable
            onPress={() => router.navigate(`/details/${[book?.[1], 0]}`)}
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 15,
            }}
            key={index}
          >
            <Image
              style={{ width: "23%", height: 90, borderRadius: 10 }}
              source={{ uri: book?.[0]?.bookImg }}
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
                {book?.[0]?.name}
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
                {book?.[0]?.chapters?.length}-н бүлэг
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      {/* <Pressable
        style={{ backgroundColor: "white", width: "20%", height: 80 }}
        onPress={() => navigation.navigate("CreateBook")}
      ></Pressable> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "black",
    flex: 1,
    width: Dimensions.get("window").width,
    marginTop: 50,
    paddingLeft: "3%",
    paddingRight: "3%",
    position: "relative",
    gap: 20,
    paddingBottom: 20,
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
