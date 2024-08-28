import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import {
  collection,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import { PostCard } from "./PostCard";
import BottomSheet from "@gorhom/bottom-sheet";
import { PostBottomSheet } from "./PostBottomSheet";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { AuthContext } from "@/context/authContext";
import { db } from "@/common";

export function FollowingPosts({ navigation }: { navigation: any }) {
  const { userData } = useContext(AuthContext);
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
    console.log("pl");
    setPosts([]);
    if (userData?.following[0]) {
      for (const element of userData?.following || []) {
        console.log(element);

        const q = query(
          collection(db, "posts"),
          where("userId", "==", element)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          const postData = [doc.data(), doc.id];
          const userRef = postData?.[0]?.userRef || null;

          let userData = null;
          if (userRef) {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              userData = userDoc.data();
            }
          }

          const unsubscribe = onSnapshot(
            query(collection(db, "posts", doc.id, "likes")),
            (likesSnapshot) => {
              const likes = [] as any[];
              likesSnapshot.forEach((doc) => {
                likes.push({ id: doc.id, data: doc.data() });
              });

              setPosts((prev) => [
                ...prev,
                { post: postData, likes: likes, user: userData },
              ]);
            }
          );

          return () => unsubscribe();
        });
      }
    }
  };
  useEffect(() => {
    getPostsAndUserInfo();
  }, []);
  console.log(posts);
  return (
    <GestureHandlerRootView>
      {/* <View> */}
      <View style={{ position: "relative", paddingTop: 10, height: "100%" }}>
        {/* <Pressable onPress={() => onLogout()}>
            <Text style={{ backgroundColor: "blue" }}>
              {homeTranslation?.[lang]?.["logOutBtn"]}
            </Text>
          </Pressable> */}
        {posts[0] ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // onEndReached={() => getPostsAndUserInfo()}
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
        {/* </View> */}

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
