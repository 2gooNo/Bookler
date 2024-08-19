import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { CreatePostContext } from "@/context/createPostContext";
import {
  addDoc,
  collection,
  doc,
  FieldValue,
  getDoc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { Platform, Pressable, Text } from "react-native";

import { mediaUploader } from "../../utils/image-uploader";
import { firebaseActions } from "@/utils/custom-snapshots";
import { homeTranslation } from "@/localization/translate";
import { LangContext } from "@/context/langContext";
import { router } from "expo-router";

export function CreatePostButton() {
  const { lang } = useContext(LangContext);
  const { user } = useContext(AuthContext);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const {
    selectedTags,
    media,
    title,
    bodyText,
    linkUrl,
    setBodyText,
    setMedia,
    setSelectedTags,
    setTitle,
    setLinkUrl,
  } = useContext(CreatePostContext);
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
          createdAt: serverTimestamp(),
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
        setBodyText("");
        setTitle("");
        setMedia([]);
        setLinkUrl("");
        setSelectedTags([]);
        setLinkUrl("");
        router.push("/home");
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
      <Text>{homeTranslation[lang]["post"]}</Text>
    </Pressable>
  );
}
