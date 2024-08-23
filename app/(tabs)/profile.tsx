"use client";

import { EditProfileModal } from "@/components/subComponents/EditProfileModal";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { router, useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/common";
import BackIcon from "@/assets/images/BackIcon";
import CalendarIcon from "@/assets/images/CalendarIcon";
import UserIcon from "@/assets/images/UserIcon";

export function Profile({ navigation }: { navigation: any }) {
  const { userData } = useContext(AuthContext);
  const [isEn, setIsEn] = useState(
    userData?.defaultLang == "en" ? true : false
  );
  const date = userData?.birthDate.toDate();
  const formattedDate = date?.toLocaleString();
  const year = formattedDate?.split(",")[0].split(".")[0];
  const numberMonth = formattedDate?.split(",")[0]?.split(".")[1];
  function stringMonth() {
    if (numberMonth == "01") {
      return "January";
    } else if (numberMonth == "02") {
      return "February";
    } else if (numberMonth == "03") {
      return "March";
    } else if (numberMonth == "04") {
      return "April";
    } else if (numberMonth == "05") {
      return "May";
    } else if (numberMonth == "06") {
      return "June";
    } else if (numberMonth == "07") {
      return "July";
    } else if (numberMonth == "08") {
      return "August";
    } else if (numberMonth == "09") {
      return "September";
    } else if (numberMonth == "10") {
      return "October";
    } else if (numberMonth == "11") {
      return "November";
    } else {
      return "December";
    }
  }
  async function updateUser() {
    const profilePic = doc(db, "users", userData?.userId);
    await updateDoc(profilePic, {
      defaultLang: !isEn ? "en" : "mn",
    });
    setIsEn(!isEn);
  }

  return (
    <View style={styles.allContainer}>
      {userData?.banner ? (
        <Image style={styles.banner} source={{ uri: userData?.banner }} />
      ) : (
        <View style={{ ...styles.banner, backgroundColor: "grey" }}></View>
      )}
      <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "column",
          gap: 10,
          // backgroundColor: "green",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "10%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",

            // backgroundColor: "red",
          }}
        >
          {userData?.photoUrl ? (
            <Image
              style={styles.profileImg}
              source={{ uri: userData?.photoUrl }}
            />
          ) : (
            <UserIcon></UserIcon>
          )}
          <Pressable
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.editProfile}
          >
            <Text
              style={{
                fontFamily: "Inherit",
                fontSize: 15,
                fontWeight: "700",
                color: "white",
              }}
            >
              Edit Profile
            </Text>
          </Pressable>
        </View>
        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontFamily: "Inherit",
              fontSize: 20,
              fontWeight: "800",
              color: "white",
            }}
          >
            {userData?.userName}
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Inherit",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            {userData?.bio}
          </Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <CalendarIcon style={{ width: "5%" }} />
            <Text
              style={{
                fontFamily: "Inherit",
                fontSize: 15,
                fontWeight: "500",
                color: "rgb(113, 118, 123)",
              }}
            >
              Born in {stringMonth()} {year}
            </Text>
          </View>
        </View>
        {/* <Pressable onPress={updateUser}>
          <Text style={{ color: "white" }}>{isEn ? "en" : "mn"}</Text>
        </Pressable> */}
      </View>
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
  banner: {
    position: "absolute",
    top: 0,
    width: "111%",
    height: "17%",
  },
  icon: {
    width: "60%",
    height: "60%",
  },
  iconWrapper: {
    backgroundColor: "black",
    width: "8.5%",
    height: "3.7%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
    marginBottom: "8%",
    marginLeft: "5%",
  },
  profileImg: {
    width: "22%",
    height: "100%",
    borderColor: "black",
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 4,
  },
  editProfile: {
    borderColor: "rgb(83, 100, 113)",
    borderStyle: "solid",
    borderWidth: 1,
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 30,
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
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="EditProfile"
        component={EditProfileModal}
        options={{
          // animation: "slide_from_bottom",
          headerShown: false,
          // gestureDirection: "vertical",
          presentation: "modal",
        }}
      />
    </HomeStack.Navigator>
  );
}
