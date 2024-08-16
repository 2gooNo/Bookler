import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { db } from "@/common";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import BackIcon from "@/assets/images/BackIcon";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [bookData, setBookData] = useState<any>();
  const [category, setCategory] = useState<any>();
  async function BookFetch() {
    const q = query(collection(db, "books"), where("name", "==", id));
    onSnapshot(q, async (snapshot) => {
      const userPromises = snapshot.docs.map((postDoc) => {
        setBookData(postDoc?.data());
      });
    });
  }
  async function CategoryFetch() {
    const q = query(
      collection(db, "categories"),
      where("name", "==", bookData?.categoryId)
    );
    onSnapshot(q, async (snapshot) => {
      const userPromises = snapshot.docs.map((postDoc) => {
        setCategory(postDoc?.data());
      });
    });
  }
  useEffect(() => {
    BookFetch();
    CategoryFetch();
  }, []);

  return (
    <View style={styles.allContainer}>
      <Image style={styles.banner} source={{ uri: bookData?.bookImg }} />
      <Pressable
        onPress={() => router.navigate("../(tabs)/books")}
        style={styles.iconWrapper}
      >
        <BackIcon style={styles.icon} />
      </Pressable>
      <Text
        style={{
          color: "white",
          fontFamily: "Inherit",
          fontSize: 30,
          fontWeight: "800",
        }}
      >
        {bookData?.name}
      </Text>
      <View>
        <Text style={{ color: "white" }}>{category}</Text>
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
    marginBottom: "20%",
    marginLeft: "5%",
  },
});
