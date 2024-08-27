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
import { sortBy } from "lodash";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PostBottomSheet } from "./PostBottomSheet";

export function ProfilePosts({ navigation, userId, bottomSheetRef }: any) {
  const [posts, setPosts] = useState<any[]>([]);

  const getPostsAndUserInfo = async () => {
    console.log(userId, "-0-");
    const q = query(
      collection(db, "posts"),
      where("userId", "==", userId),
      limit(4)
    );

    onSnapshot(q, async (snapshot) => {
      const postPromises = snapshot.docs.map(async (postDoc) => {
        const postData = [postDoc.data(), postDoc.id];

        const userRef =
          postData?.[0] && typeof postData?.[0] !== "string"
            ? postData?.[0].userRef
            : null;

        let userData = null;
        if (userRef) {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            userData = userDoc.data();
          }
        }

        onSnapshot(
          query(collection(db, "posts", postDoc.id, "likes")),
          (likesSnapshot) => {
            const likes = [] as any[];
            likesSnapshot.forEach((doc) => {
              likes.push({ id: doc.id, data: doc.data() });
            });

            setPosts((prev) => {
              return prev.map((item) => {
                if (item.post[1] === postDoc.id) {
                  return {
                    ...item,
                    likes: likes,
                  };
                }
                return item;
              });
            });
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
      } catch (error) {}
    });
  };

  useEffect(() => {
    getPostsAndUserInfo();
  }, []);

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

    <View
      style={{
        gap: 10,
        width: "100%",
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
    </View>
  );
}
