"use client";

import { AuthContext } from "@/context/authContext";
import { useContext, useEffect } from "react";
import { Dimensions, StyleSheet, View, Text, Pressable } from "react-native";

export default function Profile() {
  const { userData } = useContext(AuthContext);
  useEffect(() => {
    console.log("hahah", userData);
  }, [userData]);
  const date = userData.birthDate.toDate();
  const formattedDate = date.toLocaleString();
  const year = formattedDate.split(",")[0].split(".")[0];
  const numberMonth = formattedDate.split(",")[0].split(".")[1];
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

  return (
    <View style={styles.allContainer}>
      <Text style={{ color: "white" }}>{userData.userName}</Text>
      <Text style={{ color: "white" }}>
        {year}
        {stringMonth()}
      </Text>
      <Pressable>
        <Text>Edit profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "black",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    paddingTop: "18%",
    alignItems: "center",
  },
  upperText: {
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    width: "100%",
    letterSpacing: 1,
    marginBottom: "20%",
    paddingLeft: "8%",
  },
  xLogo: {
    marginBottom: "10%",
    width: "10%",
    height: "10%",
  },
  input: {
    height: "auto",
    paddingBottom: "3%",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(98,101,105)",
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "400",

    color: "rgb(74,153,233)",
  },
  nextButton: {
    backgroundColor: "white",
    paddingBottom: "2%",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
    width: "22%",
    borderRadius: 18,
  },
  passVisibilityIcon: {
    width: "100%",
    height: "100%",
    color: "white",
  },
});
