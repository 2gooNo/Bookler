import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { db } from "@/common";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import BackIcon from "@/assets/images/BackIcon";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [bookData, setBookData] = useState<any>();
  const [categoryData, setCategoryData] = useState<any>();
  async function BookFetch() {
    const q = query(collection(db, "books"), where("name", "==", id));
    onSnapshot(q, async (snapshot) => {
      const userPromises = snapshot.docs.map((postDoc) => {
        setBookData(postDoc?.data());
      });
    });
  }

  async function CategoryFetch() {
    if (bookData?.category) {
      const q = query(
        collection(db, "categories"),
        where("name", "==", bookData?.category)
      );
      onSnapshot(q, async (snapshot) => {
        const userPromises = snapshot.docs.map((postDoc) => {
          setCategoryData(postDoc?.data());
        });
      });
    }
  }
  useEffect(() => {
    BookFetch();
  }, []);
  useEffect(() => {
    if (bookData) {
      CategoryFetch();
    }
  }, [bookData]);
  function SelectChapter(index: any) {}

  return (
    <ScrollView style={styles.allContainer}>
      <Image style={styles.banner} source={{ uri: bookData?.bookImg }} />
      <Pressable
        onPress={() => router.navigate("../(tabs)/books")}
        style={styles.iconWrapper}
      >
        <BackIcon style={styles.icon} />
      </Pressable>
      <View style={{ paddingLeft: "3%", width: "100%" }}>
        <Text
          style={{
            color: "white",
            fontFamily: "Inherit",
            fontSize: 30,
            fontWeight: "800",
            marginBottom: 10,
          }}
        >
          {bookData?.name}
        </Text>
        <View style={styles.categories}>
          {/* {categoryData?.map((category: { name: string }, index: number) => (
          <View style={styles?.category} key={index}>
            <Text style={{ color: "white" }}>{category?.name}</Text>
          </View>
        ))} */}
          <View style={styles?.category}>
            <Text
              style={{
                color: "white",
                fontFamily: "Inherit",
                fontSize: 17,
                fontWeight: "700",
              }}
            >
              {categoryData?.name}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: "black", width: "100%" }}>
        <ScrollView horizontal={true} style={styles?.chapterContainer}>
          {bookData?.chapters?.map((chapter: string, index: number) => (
            <View>
              <Pressable
                style={{
                  borderBottomColor: "rgb(73,153,232)",
                  borderBottomWidth: 5,
                  marginBottom: 15,
                  marginTop: 15,
                  marginLeft: 35,
                }}
                onPress={() => SelectChapter(index)}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Inherit",
                    fontSize: 17,
                    fontWeight: "700",
                  }}
                >
                  {chapter}
                </Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
        <View style={styles?.postContainer}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "rgb(10,20,21)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "relative",
  },
  banner: {
    position: "absolute",
    top: 0,
    width: "111%",
    height: 160,
  },
  icon: {
    width: "60%",
    height: 70,
  },
  iconWrapper: {
    backgroundColor: "black",
    width: "8.5%",
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
    marginBottom: "20%",
    marginLeft: "5%",
    marginTop: 50,
  },
  categories: {
    gap: 30,
  },
  category: {
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 50,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: "20%",
  },
  chapterContainer: {
    borderBottomColor: "rgb(17,19,20)",
    borderBottomWidth: 1,
    paddingRight: 35,
  },
  postContainer: {},
});
