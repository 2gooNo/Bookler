import { db } from "@/common";
import { CommentCard } from "@/components/subComponents/CommentCard";
import { AuthContext } from "@/context/authContext";
import { PostContext } from "@/context/postContext";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function CommentPage() {
  const { postId } = useLocalSearchParams();
  const { userData } = useContext(AuthContext);
  const { currentPostData } = useContext(PostContext);
  const { height, width } = Dimensions.get("window");
  const [comments, setComments] = useState<any[]>([]);
  console.log(postId);
  useEffect(() => {
    getComments();
  }, []);
  const getComments = async () => {
    if (postId == "") {
      const q = query(collection(db, "posts", postId, "comments"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data(), "comments");
        setComments((prev: any) => [...prev, [doc.data(), doc.id]]);
      });
    } else {
      setComments([]);
    }
  };
  console.log(userData);
  return (
    // <View
    //   style={{
    //     width: "100%",
    //     flex: 1,
    //     position: "relative",
    //     justifyContent: "flex-end",
    //   }}
    // >
    //   {/* <FlatList
    //         showsVerticalScrollIndicator={false}
    //         showsHorizontalScrollIndicator={false}
    //         onEndReached={() => getPostsAndUserInfo()}
    //         onEndReachedThreshold={0.5}
    //         style={{ gap: 10 }}
    //         data={posts}
    //         renderItem={({ item }) => (
    //           <PostCard
    //             item={item}
    //             bottomSheetRef={bottomSheetRef}
    //             navigation={navigation}
    //           />
    //         )}
    //         ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
    //       /> */}
    //   <CommentCard></CommentCard>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: "yellow",
        width: "100%",
        justifyContent: "flex-end",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              backgroundColor: "green",
              height: height * 0.13,
              paddingBottom: 30,
            }}
          >
            <Image
              source={{ uri: userData?.photoUrl }}
              style={{
                width: width * 0.12,
                height: height * 0.056,
                backgroundColor: "pink",
                borderRadius: 50,
              }}
            />
            <TextInput
              style={{
                backgroundColor: "pink",
                paddingVertical: 8,
                // paddingBottom: 5,
                paddingHorizontal: 10,
                borderRadius: 8,
                borderColor: "white",
                borderWidth: 2,
                width: width * 0.7,
                maxHeight: 96,
              }}
              keyboardType="default"
              placeholder={`Reply as ${userData?.userName}`}
              placeholderTextColor="gray"
              multiline={true}
              textAlignVertical="top"
            />
            <Pressable onPress={() => console.log("send")}>
              <Feather name="arrow-right" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    // </View>
  );
}
