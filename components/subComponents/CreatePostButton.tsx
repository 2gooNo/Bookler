import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { CreatePostContext } from "@/context/createPostContext";
import {
  addDoc,
  collection,
  deleteDoc,
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
    selectedBook,
    selectedChapter,
    draft,
    setBodyText,
    setMedia,
    setSelectedTags,
    setTitle,
    setLinkUrl,
    setSelectedBook,
    setSelectedChapter,
    setDraft,
  } = useContext(CreatePostContext);
  const [tags, setTags] = useState<any>([]);
  const CreatePost = async () => {
    try {
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
      if (draft[1]) {
        const docRef = doc(db, "drafts", draft[1]);
        await deleteDoc(docRef);
      }
      const uploadedMedia = await mediaUploader(media);

      if (
        tags.length == selectedTags.length &&
        uploadedMedia &&
        selectedChapter?.number
      ) {
        const docRef = await addDoc(collection(db, "posts"), {
          userId: user.uid,
          userRef: doc(db, "users", user.uid),
          bodyText: bodyText,
          title: title,
          media: uploadedMedia,
          tags: tags,
          link: linkUrl,
          createdAt: serverTimestamp(),
          chapter: {
            name: selectedChapter.name,
            number: selectedChapter?.number - 1,
          },
          book: selectedBook,
        });
        const likesCollectionRef = collection(
          doc(db, "posts", docRef.id),
          "likes"
        );

        const commentCollectionRef = collection(
          doc(db, "posts", docRef.id),
          "comments"
        );
        await addDoc(commentCollectionRef, { first: false });
        await addDoc(likesCollectionRef, {
          likedBy: user.uid,
          type: +1,
        });
        setBodyText("");
        setTitle("");
        setMedia([]);
        setLinkUrl("");
        setSelectedTags([]);
        setLinkUrl("");
        setSelectedChapter({ name: "", number: null });
        setSelectedBook({ id: "", name: "" });
        setDraft([]);
        router.push("/home");
        // alert("Subcollection document written with ID: ");
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
    <Pressable
      onPress={() => CreatePost()}
      style={{
        backgroundColor: "#1DA1F2",
        borderRadius: 25,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
      }}
    >
      <Text
        style={{
          color: "#e8e3e0",
          fontSize: 15,
          fontWeight: "bold",
        }}
      >
        {homeTranslation?.[lang]?.["post"]}
      </Text>
    </Pressable>
  );
}
