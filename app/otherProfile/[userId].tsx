"use client";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/common";
import BackIcon from "@/assets/images/BackIcon";
import CalendarIcon from "@/assets/images/CalendarIcon";
import { ProfilePosts } from "@/components/subComponents/ProfilePosts";
import { AuthContext } from "@/context/authContext";
import { BlockedUser } from "@/components/subComponents/BlockedUser";
import { ProfileFollow } from "@/components/subComponents/ProflieFollow";
import { BlockUserButton } from "@/components/subComponents/BlockUserButton";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";

export default function Profile({ navigation }: any) {
  const { userId } = useLocalSearchParams();
  const { userData: user } = useContext(AuthContext);
  const [userData, setUserData] = useState<any>();
  const date = userData?.birthDate.toDate();
  const formattedDate = date?.toLocaleString();
  const year = formattedDate?.split(",")[0].split(".")[0];
  const numberMonth = formattedDate?.split(",")[0]?.split(".")[1];
  const bottomSheetRef = useRef<BottomSheet>(null);
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
  async function UserFetch() {
    if (typeof userId == "string") {
      const q = query(collection(db, "users"), where("userId", "==", userId));
      onSnapshot(q, (snapshot) => {
        snapshot.docs.map((doc) => {
          setUserData(doc.data());
        });
      });
    }
  }
  useEffect(() => {
    UserFetch();
  }, []);

  if (
    user?.blockedUsers.includes(userId) ||
    userData?.blockedUsers.includes(user?.userId)
  ) {
    return (
      <BlockedUser
        userId={userId}
        youBlocked={user?.blockedUsers.includes(userId) ? true : false}
      />
    );
  }
  return (
    <View style={styles.allContainer}>
      {userData?.banner ? (
        <Image style={styles.banner} source={{ uri: userData?.banner }} />
      ) : (
        <View style={styles.banner}></View>
      )}
      <View style={{ width: "100%", height: "100%" }}>
        <Pressable
          onPress={() => router?.navigate("/home")}
          style={styles.iconWrapper}
        >
          <BackIcon style={styles.icon} />
        </Pressable>
        <View
          style={{
            width: "100%",
            height: "10%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          {userData?.photoUrl ? (
            <Image
              style={styles.profileImg}
              source={{ uri: userData?.photoUrl }}
            />
          ) : (
            <View style={styles.profileImg}></View>
          )}
          <ProfileFollow userId={userId} otherUser={userData} />
          <BlockUserButton blockingUser={userId} />
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
      </View>

      <ProfilePosts
        userId={userId}
        navigation={navigation}
        bottomSheetRef={bottomSheetRef}
      />
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
});
