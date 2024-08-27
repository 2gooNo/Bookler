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
import { number } from "yup";
import { PostBottomSheet } from "./PostBottomSheet";

export function BookPosts({ navigation, chapter, bookId }: any) {
  const [posts, setPosts] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: "flex",
        },
      });
    } else if (index == 1) {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
    }
  }, []);

  const getPostsAndUserInfo = async () => {
    const q = query(
      collection(db, "posts"),
      where("book.id", "==", bookId),
      where("chapter.number", "==", Number(chapter))
    );

    onSnapshot(q, async (snapshot) => {
      const postPromises = snapshot.docs.map(async (postDoc) => {
        const postData = [postDoc.data(), postDoc.id];

        const userRef =
          postData?.[0] && typeof postData?.[0] !== "string"
            ? postData?.[0].userRef
            : null;

        setLastVisible(postDoc.id);

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
  console.log(posts, ":))");
  useEffect(() => {
    getPostsAndUserInfo();
  }, []);
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // onEndReached={() => getPostsAndUserInfo()}
        onEndReachedThreshold={0.5}
        style={{
          gap: 10,
          backgroundColor: "green",
          width: "100%",
          height: "100%",
        }}
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            bottomSheetRef={bottomSheetRef}
            navigation={navigation}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
      <PostBottomSheet
        bottomSheetRef={bottomSheetRef}
        handleSheetChanges={handleSheetChanges}
        navigation={navigation}
      />
    </View>
  );
}
