import { AuthContext } from "@/context/authContext";
import { LangContext } from "@/context/langContext";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import {
  collection,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/common";
import { PostCard } from "./PostCard";
import { PostOptions } from "./PostOptions";
import BottomSheet from "@gorhom/bottom-sheet";

export function PostPage({ navigation }: { navigation: any }) {
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
      orderBy("__name__"),
      startAfter(lastVisible || "0jYHvFadWJKkEK3RtAhU"),
      limit(4)
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
  useEffect(() => {
    getPostsAndUserInfo();
  }, []);
  const onSwipe = (event: any) => {
    const translationX = event.nativeEvent.translationX;
    if (translationX > 100) {
    } else if (translationX < -70) {
      navigation.navigate("Following");
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={onSwipe}
        onHandlerStateChange={onSwipe}
      >
        <View style={{ position: "relative", paddingTop: 10 }}>
          {/* <Pressable onPress={() => onLogout()}>
            <Text style={{ backgroundColor: "blue" }}>
              {homeTranslation?.[lang]?.["logOutBtn"]}
            </Text>
          </Pressable> */}
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
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        </View>
      </PanGestureHandler>

      <BottomSheet
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
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
