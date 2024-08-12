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
import { mediaUploader } from "../../utils/image-uploader";
import { firebaseActions } from "@/utils/custom-snapshots";

export function CreatePostButton() {
  const { user } = useContext(AuthContext);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const { selectedTags, media, title, bodyText, linkUrl } =
    useContext(PostContext);
  const [tags, setTags] = useState<any>([]);
  const CreatePost = async () => {
    try {
      // await Promise.resolve(
      //   selectedTags.map(async (tag) => {
      //     const q = query(
      //       collection(db, "tags"),
      //       where("tagName", "==", tag.tagName),
      //       limit(1)
      //     );
      //     console.log(q);
      //     const tagInfo = await firebaseActions(q);
      //     console.log(tagInfo, "===");
      //     if (tagInfo?.[0]?.id) {
      //       setTags((prev: any) => [...prev, tagInfo[0]]);
      //       console.log("push id");
      //       setIsUploaded(true);
      //     } else {
      //       await CreateNewTag(tag.tagName);
      //     }
      //     return;
      //   })
      // );

      selectedTags.forEach(async (tag, index) => {
        const q = query(
          collection(db, "tags"),
          where("tagName", "==", tag.tagName),
          limit(1)
        );

        onSnapshot(q, async (snapshot) => {
          const tagInfo = snapshot.docs.map((doc) => ({
            id: doc.id,
            tagName: doc.data().tagName,
          }));

          if (tagInfo?.[0]?.id) {
            setTags((prev: any) => [...prev, tagInfo[0]]);

            setIsUploaded(true);
          } else {
            await CreateNewTag(tag.tagName);
          }
        });
      });
      console.log(tags, "---");
      const uploadedMedia = await mediaUploader(media);
      console.log(uploadedMedia, "-");

      if (tags.length == selectedTags.length && uploadedMedia) {
        const docRef = await addDoc(collection(db, "posts"), {
          userId: user.uid,
          userRef: doc(db, "users", user.uid),
          bodyText: bodyText,
          title: title,
          media: uploadedMedia,
          tags: tags,
          link: linkUrl,
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
      }
    } catch (err) {}
  };

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
