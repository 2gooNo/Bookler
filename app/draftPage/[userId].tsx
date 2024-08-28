import { db } from "@/common";
import { CreatePostContext } from "@/context/createPostContext";
import {
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";

export default function DraftPage({ navigation }: any) {
  const { userId } = useLocalSearchParams();
  const [drafts, setDrafts] = useState<any[]>([]);

  const getDrafts = async () => {
    if (!userId) return;
    console.log(userId);
    const q = query(collection(db, "drafts"), where("userId", "==", userId));

    try {
      const querySnapshot = await getDocs(q);
      const draftsData = querySnapshot.docs.map((doc) => [doc.data(), doc.id]);
      setDrafts(draftsData);
    } catch (error) {
      console.error("Error fetching drafts: ", error);
    }
  };

  useEffect(() => {
    getDrafts();
  }, [userId]);

  console.log(drafts);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#121212", width: "100%", height: "100%" }}
    >
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          gap: 20,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {drafts.map((draft, index) => (
          <DraftCard draft={draft} key={draft[1]} navigation={navigation} />
        ))}
        {!drafts[0] && (
          <Text
            style={{
              width: "100%",
              fontSize: 18,
              fontWeight: "600",
              color: "#e6e2de",
              textAlign: "center",
            }}
          >
            No drafts
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

function DraftCard({ draft }: any) {
  console.log(draft, "00");
  const {
    setBodyText,
    setTitle,
    setMedia,
    setSelectedTags,
    setLinkUrl,
    setSelectedChapter,
    setSelectedBook,
    setDraft,
  } = useContext(CreatePostContext);

  const router = useRouter();
  const navigation = useNavigation();
  const selectDraft = async () => {
    const state = navigation.getState();
    const routeName = state.routes[0]?.state?.routeNames?.[3];
    setBodyText(draft[0]?.bodyText);
    setTitle(draft[0]?.title);
    setMedia(draft[0]?.media);
    setSelectedTags(draft?.[0]?.tags);
    setLinkUrl(draft?.[0]?.link);
    setSelectedChapter(draft?.[0]?.chapter);
    setSelectedBook(draft?.[0]?.book);
    setDraft(draft);
    navigation.navigate(routeName);
  };
  return (
    <Pressable
      onPress={() => selectDraft()}
      style={{
        flexDirection: "column",
        // backgroundColor: "green",
        width: "100%",
        padding: 10,
        borderRadius: 5,
      }}
    >
      {draft[0]?.book?.name && (
        <Text
          style={{
            width: "100%",
            fontSize: 12,
            fontWeight: "400",
            color: "grey",
          }}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {draft[0]?.book?.name}
        </Text>
      )}
      {draft[0]?.title && (
        <Text
          style={{
            width: "100%",
            fontSize: 18,
            fontWeight: "600",
            color: "#e6e2de",
          }}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {draft[0]?.title}
        </Text>
      )}
      {draft[0]?.bodyText && (
        <Text
          style={{
            width: "100%",
            fontSize: 14,
            fontWeight: "400",
            color: "grey",
          }}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {draft[0]?.bodyText}
        </Text>
      )}
    </Pressable>
  );
}
