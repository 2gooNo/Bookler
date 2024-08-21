import { db } from "@/common";
import { CommentCard } from "@/components/subComponents/CommentCard";
import { AuthContext } from "@/context/authContext";
import { PostContext } from "@/context/postContext";
import { useLocalSearchParams } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
const { height, width } = Dimensions.get("window");

export default function CommentPage() {
  const { postId } = useLocalSearchParams();
  const { userData } = useContext(AuthContext);
  const { currentPostData } = useContext(PostContext);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState<string>("");

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
  const createComment = async () => {
    const docRef = await addDoc(collection(db, "posts"), {
      userId: userData?.userId,
      userRef: doc(db, "users", userData?.userId),
      bodyText: commentText,
      // media: uploadedMedia,
      // replyTo:,
      createdAt: serverTimestamp(),
    });
    const likesCollectionRef = collection(doc(db, "posts", docRef.id), "likes");
    await addDoc(likesCollectionRef, {
      likedBy: doc(db, "users", userData.userId),
      type: +1,
    });
  };
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
    //
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={height * 0.085}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.innerContainer}>
          <CommentCard />
          <View style={styles.footer}>
            <Image source={{ uri: userData?.photoUrl }} style={styles.image} />
            <TextInput
              style={styles.textInput}
              keyboardType="default"
              placeholder={`Reply as ${userData?.userName}`}
              placeholderTextColor="gray"
              multiline={true}
              textAlignVertical="top"
              onChangeText={(e) => setCommentText(e)}
              value={commentText}
            />
            <Pressable onPress={() => createComment()}>
              <Feather name="arrow-right" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    // </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    width: "100%",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    // height: height * 0.12,
    // marginBottom: height * 0.02,
    backgroundColor: "blue",
    borderColor: "white",
    borderTopWidth: 1,
    position: "absolute",
    paddingBottom: height * 0.035,
    paddingTop: height * 0.02,
    bottom: 0,
    width: "100%",
  },
  image: {
    width: width * 0.12,
    height: height * 0.056,
    backgroundColor: "pink",
    borderRadius: 50,
  },
  textInput: {
    backgroundColor: "pink",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 2,
    width: width * 0.7,
    maxHeight: 96,
  },
});
