import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { PostContext } from "@/context/createPostContext";
import { addDoc, collection, doc } from "firebase/firestore";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

export function CreatePostButton() {
  const { user } = useContext(AuthContext);
  const { selectedTags, images, title, bodyText } = useContext(PostContext);
  const CreatePost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userId: user.uid,
        userRef: doc(db, "users", user.uid),
        bodyText: bodyText,
        title: title,
        images: images,
        tags: selectedTags,
      });

      const likesCollectionRef = collection(
        doc(db, "posts", docRef.id),
        "likes"
      );
      const commentCollectionRef = collection(
        doc(db, "posts", docRef.id),
        "comments"
      );
      const subDocRef = await addDoc(likesCollectionRef, {
        likedBy: doc(db, "users", user.uid),
        type: +1,
      });

      alert("Subcollection document written with ID: ");
    } catch (err) {}
  };
  return (
    <Pressable onPress={() => CreatePost()} style={{ backgroundColor: "pink" }}>
      <Text></Text>
    </Pressable>
  );
}
