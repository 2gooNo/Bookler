import { AuthContext } from "@/context/authContext";
import { LangContext } from "@/context/langContext";
import { homeTranslation } from "@/localization/translate";
import { useContext, useEffect, useState } from "react";
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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "@/common";
import { PostCard } from "./PostCard";

export function PostPage({ navigation }: { navigation: any }) {
  const { onLogout } = useContext(AuthContext);
  const { lang } = useContext(LangContext);
  const [posts, setPosts] = useState<any[]>([]);
  const getPostsAndUserInfo = async () => {
    const q = query(collection(db, "posts"));

    onSnapshot(q, async (snapshot) => {
      const userPromises = snapshot.docs.map((postDoc) => {
        const postData = [postDoc.data(), postDoc.id];

        const userRef = postData?.[0]?.userRef;

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
            console.error(error);
            return {
              post: postData,
              user: null,
            };
          });
      });
      console.log(console.log(userPromises, "--"));
      try {
        const results = await Promise.all(userPromises);
        console.log(results, ")");
        setPosts(results);
      } catch (error) {
        console.error(error);
      }
      try {
      } catch (error) {
        console.error(error);
      }
    });
  };
  useEffect(() => {
    getPostsAndUserInfo();
  }, []);
  const onSwipe = (event: any) => {
    const translationX = event.nativeEvent.translationX;
    console.log(translationX);
    if (translationX > 100) {
      console.log("swipe");
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
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostCard item={item} />}
        >
          <Pressable onPress={() => onLogout()}>
            <Text style={{ backgroundColor: "blue" }}>
              {homeTranslation?.[lang]?.["logOutBtn"]}
            </Text>
          </Pressable>
        </FlatList>
      </PanGestureHandler>
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
