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
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import BackIcon from "@/assets/images/BackIcon";
import { JoinCommuinityButton } from "@/components/subComponents/JoinCommuinityButton";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [bookData, setBookData] = useState<any>();
  const [activeTab, setActiveTab] = useState(0);
  const [categoryData, setCategoryData] = useState<any>();
  const [communityMembers, setCommunityMembers] = useState<number>(0);
  async function BookFetch() {
    if (typeof id == "string") {
      const docRef = doc(db, "books", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBookData(docSnap?.data());
      }
    }
  }
  async function UsersFetch() {
    const q = query(
      collection(db, "users"),
      where("books", "array-contains", id)
    );
    var number = 0;
    onSnapshot(q, async (snapshot) => {
      setCommunityMembers(snapshot.docs.length);
      const userPromises = snapshot.docs.map((postDoc) => {
        // console.log("=====", postDoc.data());
        // console.log(number);
        // number = number + 1;
        // setCommunityMembers((prev) => prev + 1);
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
    setCommunityMembers(0);
    UsersFetch();
  }, []);
  useEffect(() => {
    if (bookData) {
      CategoryFetch();
    }
  }, [bookData]);
  function SelectChapter(index: number) {
    setActiveTab(index);
  }
  // function getActiveContet(activeTab: number) {
  //   return {
  //     id: activeTab,
  //   };
  // }

  return (
    <ScrollView style={styles.allContainer}>
      <Image style={styles.banner} source={{ uri: bookData?.bookImg }} />
      <Pressable
        onPress={() => router.navigate("../(tabs)/books")}
        style={styles.iconWrapper}
      >
        <BackIcon style={styles.icon} />
      </Pressable>
      <View
        style={{
          paddingLeft: "3%",
          width: "100%",
          marginBottom: 30,
          paddingRight: 30,
        }}
      >
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
                fontSize: 13,
                fontWeight: "700",
              }}
            >
              {categoryData?.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 51,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "rgb(205,205,205)",
              fontFamily: "Inherit",
              fontSize: 17,
              fontWeight: "400",
            }}
          >
            {communityMembers} Гишүүд
          </Text>
          <JoinCommuinityButton bookId={id} />
        </View>
        <Text
          style={{
            color: "rgb(205,205,205)",
            fontFamily: "Inherit",
            fontSize: 17,
            fontWeight: "400",
            marginTop: 20,
          }}
        >
          {bookData?.description}
        </Text>
      </View>
      <View style={{ backgroundColor: "black", width: "100%" }}>
        <ScrollView horizontal={true} style={styles?.chapterContainer}>
          {bookData?.chapters?.map((chapter: string, index: number) => (
            <Pressable
              style={{
                borderBottomColor: `${
                  activeTab == index ? "rgb(73,152,232)" : "black"
                }`,
                borderBottomWidth: 5,
                marginTop: 15,
                marginLeft: 35,
                height: 40,
              }}
              key={index}
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
          ))}
        </ScrollView>
        <View style={styles?.postContainer}>
          {/* <ContentShower data={getActiveContet(activeTab)} /> */}
        </View>
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
    paddingBottom: 3,
    paddingTop: 3,
    justifyContent: "center",
    alignItems: "center",
    width: 62,
  },
  chapterContainer: {
    borderBottomColor: "rgb(17,19,20)",
    borderBottomWidth: 1,
    paddingRight: 35,
  },
  postContainer: {},
});
