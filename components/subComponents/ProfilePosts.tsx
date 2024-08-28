import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  collection,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "@/common";
import { PostCard } from "./PostCard";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PostBottomSheet } from "./PostBottomSheet";

export function ProfilePosts({ navigation, userId, bottomSheetRef }: any) {
  const [posts, setPosts] = useState<any[]>([]);

  const handleSheetChanges = useCallback((index: number) => {
    // if (index == -1) {
    //   navigation.getParent().setOptions({
    //     tabBarStyle: {
    //       display: "flex",
    //     },
    //   });
    // } else if (index == 1) {
    //   navigation.getParent().setOptions({
    //     tabBarStyle: {
    //       display: "none",
    //     },
    //   });
    // }
  }, []);

  const getPostsAndUserInfo = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));

    onSnapshot(q, async (snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
      } else {
        console.log("Documents found:", snapshot.size);

        const postPromises = snapshot.docs.map(async (postDoc) => {
          console.log("Post document data:", postDoc.data());

          const postData = [postDoc.data(), postDoc.id];
          const userRef =
            postData?.[0] && typeof postData?.[0] !== "string"
              ? postData?.[0].userRef
              : null;

          let userData = null;
          if (userRef) {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              console.log("User data found:", userDoc.data());
              userData = userDoc.data();
            }
          }

          // Likes snapshot
          onSnapshot(
            query(collection(db, "posts", postDoc.id, "likes")),
            (likesSnapshot) => {
              const likes = [] as any[];
              likesSnapshot.forEach((doc) => {
                likes.push({ id: doc.id, data: doc.data() });
              });

              setPosts((prev) =>
                prev.map((item) =>
                  item.post[1] === postDoc.id ? { ...item, likes: likes } : item
                )
              );
            }
          );

          return {
            post: postData,
            user: userData,
            likes: [],
          };
        });

        try {
          const results = await Promise.all(postPromises);
          if (results) {
            setPosts((prev) => [...prev, ...results]);
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    });
  };

  useEffect(() => {
    getPostsAndUserInfo();
  }, []);
  console.log(userId, "-0-", posts);
  return (
    // <FlatList
    //   showsVerticalScrollIndicator={false}

    //   //   onEndReached={() => getPostsAndUserInfo()}
    //   onEndReachedThreshold={0.5}

    //   data={posts}
    //   renderItem={({ item }) => (

    //   )}
    //   ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    // />
    <GestureHandlerRootView>
      <View
        style={{
          gap: 10,
          width: "100%",
          zIndex: 100,
          // backgroundColor: "pink",
        }}
      >
        {posts?.map((item, index) => (
          <PostCard
            key={index}
            item={item}
            bottomSheetRef={bottomSheetRef}
            navigation={navigation}
          />
        ))}
        <PostBottomSheet
          bottomSheetRef={bottomSheetRef}
          handleSheetChanges={handleSheetChanges}
          navigation={navigation}
        />
      </View>
    </GestureHandlerRootView>
  );
}
