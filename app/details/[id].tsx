import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  FlatList,
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
import { useCallback, useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import BackIcon from "@/assets/images/BackIcon";
import { JoinCommuinityButton } from "@/components/subComponents/JoinCommuinityButton";
import { BookSelect } from "@/components/subComponents/BookSelect";
import { BookPosts } from "@/components/subComponents/BookPosts";
import { PostBottomSheet } from "@/components/subComponents/PostBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";

export default function DetailsScreen({ navigation }: any) {
  const { id } = useLocalSearchParams();
  const [bookId, chapter] = typeof id == "string" ? id.split(",") : [];
  const [bookData, setBookData] = useState<any>();
  const [activeTab, setActiveTab] = useState(Number(chapter));
  const [categoryData, setCategoryData] = useState<any>();
  const [communityMembers, setCommunityMembers] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  async function BookFetch() {
    if (typeof bookId == "string") {
      const docRef = doc(db, "books", bookId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap?.data(), "---------");
        setBookData(docSnap?.data());
      }
    }
  }
  async function UsersFetch() {
    const q = query(
      collection(db, "users"),
      where("books", "array-contains", bookId)
    );

    onSnapshot(q, async (snapshot) => {
      setCommunityMembers(snapshot.docs.length);
      const userPromises = snapshot.docs.map((postDoc) => {});
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
  console.log(activeTab);

  // function getActiveContet(activeTab: number) {
  //   return {
  //     id: activeTab,
  //   };
  // }
  console.log("bookData?.name", bookData?.name);
  return (
    <ScrollView
      style={styles.allContainer}
      showsVerticalScrollIndicator={false}
    >
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
          <JoinCommuinityButton bookId={bookId} />
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
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
        }}
      >
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles?.chapterContainer}
          >
            {bookData?.chapters?.map((chapter: string, index: number) => {
              console.log(chapter);
              return (
                <Pressable
                  style={{
                    borderBottomColor:
                      activeTab == index ? "rgb(73,152,232)" : "black",
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
              );
            })}
          </ScrollView>
        </View>
        <BookPosts
          chapter={activeTab}
          bookId={bookId}
          navigation={navigation}
          bottomSheetRef={bottomSheetRef}
        />
      </View>
      <PostBottomSheet
        bottomSheetRef={bottomSheetRef}
        handleSheetChanges={handleSheetChanges}
        navigation={navigation}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "rgb(10,20,21)",
    // height: Dimensions.get("window").height,
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
});
