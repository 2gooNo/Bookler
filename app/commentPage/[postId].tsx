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
  startAfter,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
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
  const [replyTo, setReplyTo] = useState<string | any>({});
  const textInputField = useRef(null);

  const getComments = async () => {
    if (typeof postId === "string" && !Array.isArray(postId)) {
      const q = query(
        collection(db, "posts", postId, "comments"),
        where("userId", "!=", null)
      );

      onSnapshot(q, async (snapshot) => {
        const commentPromises = snapshot.docs.map(async (commentDoc) => {
          const commentData = [commentDoc.data(), commentDoc.id];
          const userRef =
            commentData?.[0] && typeof commentData?.[0] !== "string"
              ? commentData?.[0].userRef
              : null;

          let userData = null;
          if (userRef) {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              userData = userDoc.data();
            }
          }

          onSnapshot(
            query(
              collection(
                db,
                "posts",
                postId,
                "comments",
                commentDoc.id,
                "likes"
              )
            ),
            (likesSnapshot) => {
              const likes = [] as any[];
              likesSnapshot.forEach((doc) => {
                likes.push({ id: doc.id, data: doc.data() });
              });

              setComments((prev) =>
                prev.map((item) =>
                  item.comment[1] === commentDoc.id
                    ? { ...item, likes: likes }
                    : item
                )
              );
            }
          );

          return {
            comment: commentData,
            user: userData,
            likes: [],
          };
        });

        const results = await Promise.all(commentPromises);

        if (results) {
          setComments((prev) => {
            const newComments = results.filter(
              (newComment) =>
                !prev.some(
                  (existingComment) =>
                    existingComment.comment[1] === newComment.comment[1]
                )
            );

            return [...prev, ...newComments];
          });
        }
      });
    } else {
      setComments([]);
    }
  };
  console.log(comments);
  const createComment = async () => {
    if (typeof postId === "string" && !Array.isArray(postId)) {
      try {
        Keyboard.dismiss();
        const commentsCollectionRef = collection(
          db,
          "posts",
          postId,
          "comments"
        );

        const docRef = await addDoc(commentsCollectionRef, {
          userId: userData?.userId,
          userRef: doc(db, "users", userData?.userId),
          bodyText: commentText,

          replyTo: replyTo.id || "",
          createdAt: serverTimestamp(),
        });

        const commentRef = doc(db, "posts", postId, "comments", docRef.id);
        const likesCollectionRef = collection(commentRef, "likes");
        await addDoc(likesCollectionRef, {
          likedBy: userData.userId,
          type: +1,
        });
        setReplyTo("");
        setCommentText("");
      } catch (error) {
        console.error("Error creating comment: ", error);
      }
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={height * 0.085}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.innerContainer}>
          {comments[0] ? (
            <FlatList
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              // onEndReached={() => getPostsAndUserInfo()}
              // onEndReachedThreshold={0.5}
              // style={{ gap: 10 }}
              data={comments}
              renderItem={({ item }) => (
                <CommentCard
                  comment={item}
                  setReplyTo={setReplyTo}
                  navigation={navigation}
                  textInputField={textInputField}
                  postId={postId}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: "#6c757d" }} />
              )}
            />
          ) : (
            <Text>Be the first to Comment? :D</Text>
          )}

          <View style={styles.footer}>
            {replyTo.id && (
              <View style={styles.replyingTo}>
                <Text style={{ color: "white" }}>
                  {replyTo.userName}-руу хариулах
                </Text>
                <Pressable onPress={() => setReplyTo("")}>
                  <Text>Болих</Text>
                </Pressable>
              </View>
            )}
            <View style={styles.footerInner}>
              <Image
                source={{ uri: userData?.photoUrl }}
                style={styles.image}
              />
              <TextInput
                style={styles.textInput}
                keyboardType="default"
                placeholder={`Reply as ${userData?.userName}`}
                placeholderTextColor="gray"
                multiline={true}
                textAlignVertical="top"
                onChangeText={(e) => setCommentText(e)}
                value={commentText}
                autoFocus={true}
                ref={textInputField}
              />
              <Pressable
                onPress={() => createComment()}
                style={styles.submitButton}
              >
                <Feather name="arrow-right" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#121212",
    borderColor: "light-grey",
    borderTopWidth: 0.3,
    position: "absolute",
    paddingBottom: height * 0.035,
    paddingTop: height * 0.02,
    bottom: 0,
    width: "100%",
    gap: 10,
  },
  footerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  image: {
    width: width * 0.12,
    height: height * 0.056,
    backgroundColor: "pink",
    borderRadius: 50,
  },
  textInput: {
    backgroundColor: "rgb(33,35,40)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 0.4,
    width: width * 0.7,
    maxHeight: 96,
  },
  replyingTo: {
    flexDirection: "row",
    // backgroundColor: "yellow",
    gap: 10,
    // padding: 10,
    width: "100%",
  },
  submitButton: {
    height: "100%",
    justifyContent: "center",
  },
});
