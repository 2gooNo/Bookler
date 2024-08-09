import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { PostContext } from "@/context/createPostContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { Platform, Pressable, Text } from "react-native";
import { MediaUploader } from "./ImageUploader";

export function CreatePostButton() {
  const { user } = useContext(AuthContext);
  const { selectedTags, media, title, bodyText, linkUrl } =
    useContext(PostContext);
  const [tags, setTags] = useState<any>([]);
  const CreatePost = async () => {
    try {
      // -----
      // selectedTags.forEach((tag) => {
      //   const q = query(
      //     collection(db, "tags"),
      //     where("tagName", "==", tag.tagName),
      //     limit(1)
      //   );
      //   onSnapshot(q, (snapshot) => {
      //     const tagInfo = snapshot.docs.map((doc) => ({
      //       id: doc.id,
      //       tagName: doc.data().tagName,
      //     }));
      //     if (tagInfo?.[0]?.id) {
      //       setTags((prev: any) => [...prev, tagInfo[0]]);
      //       console.log("push id");
      //     } else CreateNewTag(tag.tagName);
      //   });
      // });
      // -----
      const uploadedMedia = await MediaUploader(media);
      console.log(uploadedMedia, "-");

      // -----
      // const docRef = await addDoc(collection(db, "posts"), {
      //   userId: user.uid,
      //   userRef: doc(db, "users", user.uid),
      //   bodyText: bodyText,
      //   title: title,
      //   media: media,
      //   tags: selectedTags,
      //   link: linkUrl,
      // });
      // const likesCollectionRef = collection(
      //   doc(db, "posts", docRef.id),
      //   "likes"
      // );
      // const commentCollectionRef = collection(
      //   doc(db, "posts", docRef.id),
      //   "comments"
      // );
      // const subDocRef = await addDoc(likesCollectionRef, {
      //   likedBy: doc(db, "users", user.uid),
      //   type: +1,
      // });
      // alert("Subcollection document written with ID: ");
    } catch (err) {}
  };
  console.log(tags, "---");
  const CreateNewTag = async (tagName: string) => {
    const docRef = await addDoc(collection(db, "tags"), {
      tagName: tagName,
    });
    const docSnap = await getDoc(docRef);
  };
  return (
    <Pressable onPress={() => CreatePost()} style={{ backgroundColor: "pink" }}>
      <Text>Post</Text>
    </Pressable>
  );
}
