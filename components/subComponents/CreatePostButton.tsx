import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { addDoc, collection, doc } from "firebase/firestore";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

export function CreatePostButton() {
  const { user } = useContext(AuthContext);
  const CreatePost = async () => {
    console.log(user);
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userRef: doc(db, "users", user.uid),
        bodyText: "anything",
        title: "Smt",
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
