import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import {
  collection,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

import { PostCard } from "./PostCard";
import BottomSheet from "@gorhom/bottom-sheet";
import { PostBottomSheet } from "./PostBottomSheet";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

export function FollowingPosts({ navigation }: { navigation: any }) {
  const [posts, setPosts] = useState<any[]>([]);
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
    // const q = lastVisible
    //   ? query(
    //       collection(db, "posts"),
    //       // orderBy("__name__"),
    //       // startAfter(lastVisible),
    //       limit(4)
    //     )
    //   : query(collection(db, "posts"), limit(4));
    // onSnapshot(q, async (snapshot) => {
    //   const postPromises = snapshot.docs.map(async (postDoc) => {
    //     const postData = [postDoc.data(), postDoc.id];
    //     const userRef =
    //       postData?.[0] && typeof postData?.[0] !== "string"
    //         ? postData?.[0].userRef
    //         : null;
    //     setLastVisible(postDoc.id);
    //     let userData = null;
    //     if (userRef) {
    //       const userDoc = await getDoc(userRef);
    //       if (userDoc.exists()) {
    //         userData = userDoc.data();
    //       }
    //     }
    //     onSnapshot(
    //       query(collection(db, "posts", postDoc.id, "likes")),
    //       (likesSnapshot) => {
    //         const likes = [] as any[];
    //         likesSnapshot.forEach((doc) => {
    //           likes.push({ id: doc.id, data: doc.data() });
    //         });
    //         setPosts((prev) => {
    //           return prev.map((item) => {
    //             if (item.post[1] === postDoc.id) {
    //               return {
    //                 ...item,
    //                 likes: likes,
    //               };
    //             }
    //             return item;
    //           });
    //         });
    //       }
    //     );
    //     return {
    //       post: postData,
    //       user: userData,
    //       likes: [],
    //     };
    //   });
    //   try {
    //     const results = await Promise.all(postPromises);
    //     if (results) {
    //       setPosts((prev) => [...prev, ...results]);
    //     }
    //   } catch (error) {}
    // });
  };
  useEffect(() => {
    getPostsAndUserInfo();
  }, []);

  return (
    <GestureHandlerRootView>
      <View>
        <View style={{ position: "relative", paddingTop: 10 }}>
          {/* <Pressable onPress={() => onLogout()}>
            <Text style={{ backgroundColor: "blue" }}>
              {homeTranslation?.[lang]?.["logOutBtn"]}
            </Text>
          </Pressable> */}
          {posts[0] ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onEndReached={() => getPostsAndUserInfo()}
              onEndReachedThreshold={0.5}
              style={{ gap: 10 }}
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
          ) : (
            <Text
              style={{
                height: "100%",
                color: "grey",
                fontSize: 18,
                justifyContent: "center",
                textAlign: "center",
                marginTop: 50,
              }}
            >
              You havent followed anyone :)
            </Text>
          )}
        </View>

        <PostBottomSheet
          bottomSheetRef={bottomSheetRef}
          handleSheetChanges={handleSheetChanges}
          navigation={navigation}
        />
        {/* <BottomSheet 
        snapPoints={[400, 230]}
        onChange={handleSheetChanges}
        ref={bottomSheetRef}
        index={-1}
        containerHeight={600}
        enablePanDownToClose={true}
        style={{
          width: "100%",
          height: "auto",
          zIndex: 10,
        }}
        backgroundStyle={{
          backgroundColor: "#121212",
        }}
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
        onClose={() =>
          navigation.getParent().setOptions({
            tabBarStyle: {
              display: "flex",
            },
          })
        }
      >
        <PostOptions />
      </BottomSheet> */}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
