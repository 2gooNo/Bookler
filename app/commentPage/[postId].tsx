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
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
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

export default function CommentPage({ navigation }: any) {
  const { postId } = useLocalSearchParams();
  const { userData } = useContext(AuthContext);
  const { currentPostData } = useContext(PostContext);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [replyTo, setReplyTo] = useState();

  console.log(postId);

  const getComments = async () => {
    if (postId == "") {
      // const q = query(collection(db, "posts", postId, "comments"));
      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach(async (doc) => {
      //   const q = query(
      //     collection(db, "posts", postId, "comments", doc.id, "likes")
      //   );
      //   const queryLikes = await getDocs(q);
      //   queryLikes.forEach(async (doc) => {});
      //   setComments((prev: any) => [...prev, [doc.data(), doc.id]]);
      // });
      const q = query(collection(db, "posts", postId, "comments"));

      onSnapshot(q, async (snapshot) => {
        const commentPromises = snapshot.docs.map(async (commentDoc) => {
          const Commentdata = [commentDoc.data(), commentDoc.id];
          const userRef =
            Commentdata?.[0] && typeof Commentdata?.[0] !== "string"
              ? Commentdata?.[0].userRef
              : null;

          let userData = null;
          if (userRef) {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              userData = userDoc.data();
            }
          }

          onSnapshot(
            query(collection(db, "posts", commentDoc.id, "likes")),
            (likesSnapshot) => {
              const likes = [] as any[];
              likesSnapshot.forEach((doc) => {
                likes.push({ id: doc.id, data: doc.data() });
              });

              setComments((prev) => {
                return prev.map((item) => {
                  if (item.post[1] === commentDoc.id) {
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
            post: Commentdata,
            user: userData,
            likes: [],
          };
        });
        const results = await Promise.all(commentPromises);
        if (results) {
          setComments((prev) => [...prev, ...results]);
        }
      });
    } else {
      setComments([]);
    }

    // const results = await Promise.all(postPromises);
    // if (results) {
    //   setPosts((prev) => [...prev, ...results]);
    // }
  };
  console.log(userData, comments);

  const createComment = async () => {
    const docRef = await addDoc(collection(db, "posts"), {
      userId: userData?.userId,
      userRef: doc(db, "users", userData?.userId),
      bodyText: commentText,
      // media: uploadedMedia,
      replyTo: replyTo,
      createdAt: serverTimestamp(),
    });
    const likesCollectionRef = collection(doc(db, "posts", docRef.id), "likes");
    await addDoc(likesCollectionRef, {
      likedBy: doc(db, "users", userData.userId),
      type: +1,
    });
  };

  useEffect(() => {
    getComments();
  }, []);

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
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // onEndReached={() => getPostsAndUserInfo()}
            // onEndReachedThreshold={0.5}
            style={{ gap: 10 }}
            data={comments}
            renderItem={({ item }) => (
              <CommentCard
                comment={item}
                setReplyTo={setReplyTo}
                navigation={navigation}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
          {/* <CommentCard setReplyTo={setReplyTo} /> */}
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
            <Pressable
              onPress={() => createComment()}
              style={styles.submitButton}
            >
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
  submitButton: { height: "100%", justifyContent: "center" },
});
