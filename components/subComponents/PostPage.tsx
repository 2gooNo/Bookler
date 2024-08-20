import { AuthContext } from "@/context/authContext";
import { LangContext } from "@/context/langContext";
import { homeTranslation } from "@/localization/translate";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import firebase from "firebase/app";
import {
  collection,
  doc,
  DocumentData,
  documentId,
  FieldPath,
  FieldValue,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { app, db } from "@/common";
import { PostCard } from "./PostCard";
import { PostOptions } from "./PostOptions";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export function PostPage({ navigation }: { navigation: any }) {
  const { onLogout } = useContext(AuthContext);
  const { lang } = useContext(LangContext);
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
  const [postSheetData, setPostSheetData] = useState<any>();

  const getPostsAndUserInfo = async () => {
    const q = query(
      collection(db, "posts"),
      orderBy("__name__"),
      startAfter(lastVisible || "0jYHvFadWJKkEK3RtAhU"),
      limit(2)
    );

    onSnapshot(q, async (snapshot) => {
      const userPromises = snapshot.docs.map((postDoc) => {
        const postData = [postDoc.data(), postDoc.id];

        const userRef =
          postData?.[0] && typeof postData?.[0] !== "string"
            ? postData?.[0].userRef
            : null;
        setLastVisible(postDoc.id);
        return getDoc(userRef)
          .then((userDoc) => {
            if (userDoc.exists()) {
              return {
                post: postData,
                user: userDoc.data(),
              };
            }
          })
          .catch((error) => {
            return {
              post: postData,
              user: null,
            };
          });
      });

      try {
        const results = await Promise.all(userPromises);
        if (results) {
          setPosts((prev) => [...prev, ...results]);
        }
      } catch (error) {
        // console.error(error);
      }
      try {
      } catch (error) {
        // console.error(error);
      }
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
        <View style={{ position: "relative", paddingVertical: 10 }}>
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
      {/* <BottomSheetModalProvider> */}
      {/* <View
        style={{
          height: 800,
          width: "100%",
          position: "absolute",
          bottom: 0,
          zIndex: 1000,
        }}
      > */}
      <BottomSheet
        snapPoints={[600, 400]}
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
        onClose={() =>
          navigation.getParent().setOptions({
            tabBarStyle: {
              display: "flex",
            },
          })
        }
      >
        {/* <FullWindowOverlay>
          <View>  */}
        <PostOptions />
        {/* </View>
          </FullWindowOverlay> */}
      </BottomSheet>
      {/* </View> */}
      {/* </BottomSheetModalProvider> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "black",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    paddingTop: "18%",
    alignItems: "center",
    paddingLeft: "8%",
    paddingRight: "8%",
  },
  upperText: {
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    width: "100%",
    letterSpacing: 1,
    marginBottom: "40%",
  },
  fastLogButtons: {
    gap: 10,
    width: "100%",
    height: "auto",
  },
  fastLogButton: {
    width: "100%",
    height: "8%",
    backgroundColor: "white",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  xLogo: {
    marginBottom: "35%",
  },
  fastLogLogo: {
    width: "10%",
    height: "60%",
  },
  fastLogText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 15,
  },
  orContainer: {
    flexDirection: "row",
    width: "100%",
    height: "auto",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  grayLine: {
    height: "10%",
    width: "43%",
    borderColor: " rgb(136,138,141)",
    borderStyle: "solid",
    borderWidth: 1,
  },
  choiseSection: {
    width: "100%",
    height: "100%",
    position: "relative",
    gap: 10,
  },
  orText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
    color: " rgb(136,138,141)",
  },
  logInTextContainer: {
    marginTop: "8%",
    flexDirection: "row",
    gap: 5,
  },
  logInText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
    color: " rgb(74,152,232)",
  },
});
