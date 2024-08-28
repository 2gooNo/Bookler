import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { PostCard } from "@/components/subComponents/PostCard";
import { PostOptions } from "@/components/subComponents/PostOptions";

export default function FavoritesPage({ navigation }: any) {
  const { userId } = useLocalSearchParams();
  const { userData } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<any[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const getFavorites = async () => {
    for (const element of userData?.favorites || []) {
      const docRef = doc(db, "posts", element);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const postData = [docSnapshot.data(), docSnapshot.id];
        const userRef = postData?.[0]?.userRef || null;

        let userData = null;
        if (userRef) {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            userData = userDoc.data();
          }
        }

        const likes = onSnapshot(
          collection(db, "posts", docSnapshot.id, "likes"),
          (likesSnapshot) => {
            const likes = [] as any[];
            likesSnapshot.forEach((doc) => {
              likes.push({ id: doc.id, data: doc.data() });
            });

            setFavorites((prev) => [
              ...prev,
              { post: postData, likes: likes, user: userData },
            ]);
          }
        );

        return () => likes();
      }
    }
  };

  const handleSheetChanges = () => {};

  useEffect(() => {
    getFavorites();
  }, []);

  console.log(favorites, userData?.favorites, "--");

  return (
    <GestureHandlerRootView>
      <View
        style={{
          backgroundColor: "#121212",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!favorites[0] && (
          <Text
            style={{
              width: "100%",
              fontSize: 18,
              fontWeight: "600",
              color: "#e6e2de",
              textAlign: "center",
            }}
          >
            No Favorites
          </Text>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          style={{ gap: 10 }}
          data={favorites}
          renderItem={({ item }) => (
            <PostCard
              item={item}
              bottomSheetRef={bottomSheetRef}
              navigation={navigation}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
        <BottomSheet
          snapPoints={[400, 230]}
          onChange={handleSheetChanges}
          ref={bottomSheetRef}
          index={-1}
          enablePanDownToClose={true}
          style={{
            width: "100%",
            zIndex: 10,
          }}
          backgroundStyle={{
            backgroundColor: "#121212",
          }}
          handleIndicatorStyle={{ backgroundColor: "transparent" }}
        >
          <PostOptions />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
