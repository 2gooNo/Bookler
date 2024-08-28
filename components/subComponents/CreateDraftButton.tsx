import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { CreatePostContext } from "@/context/createPostContext";
import { LangContext } from "@/context/langContext";
import { homeTranslation } from "@/localization/translate";
import { router } from "expo-router";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

export function CreateDraftButton({ setModalVisible }: any) {
  const { user } = useContext(AuthContext);
  const { lang } = useContext(LangContext);
  const {
    selectedTags,
    media,
    title,
    bodyText,
    linkUrl,
    selectedChapter,
    selectedBook,
    draft,
    setBodyText,
    setTitle,
    setMedia,
    setSelectedTags,
    setLinkUrl,
    setSelectedChapter,
    setSelectedBook,
    setDraft,
  } = useContext(CreatePostContext);
  const CreateDraft = async () => {
    if (draft[1]) {
      console.log(draft[1]);
      const docRef = doc(db, "drafts", draft[1]);
      await updateDoc(docRef, {
        bodyText: draft?.[0]?.bodyText,
        title: draft?.[0]?.title,
        media: draft?.[0]?.media,
        tags: draft?.[0]?.tags,
        link: draft?.[0]?.link,
        chapter: draft?.[0]?.chapter,
        book: draft?.[0]?.book,
      });
      setBodyText("");
      setTitle("");
      setMedia([]);
      setSelectedTags([]);
      setLinkUrl("");
      setSelectedChapter({ name: "", number: null });
      setSelectedBook({ id: "", name: "" });
      setModalVisible(false);
      router.push("/home");
    } else {
      try {
        await addDoc(collection(db, "drafts"), {
          userId: user.uid,
          userRef: doc(db, "users", user.uid),
          bodyText: bodyText,
          title: title,
          media: media,
          tags: selectedTags,
          link: linkUrl,
          chapter: selectedChapter,
          book: selectedBook,
        }).then((res) => {
          setBodyText("");
          setTitle("");
          setMedia([]);
          setSelectedTags([]);
          setLinkUrl("");
          setSelectedChapter({ name: "", number: null });
          setSelectedBook({ id: "", name: "" });
          setModalVisible(false);
          setDraft([]);
          router.push("/home");
        });
      } catch (err) {}
    }
  };
  return (
    <Pressable
      onPress={() => CreateDraft()}
      style={{
        borderRadius: 30,
        padding: 10,
        elevation: 2,
        paddingVertical: 15,
        backgroundColor: "#1DA1F2",
        width: "45%",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#e8e3e0", fontSize: 15, fontWeight: "bold" }}>
        {homeTranslation?.[lang]?.["draft"]}
      </Text>
    </Pressable>
  );
}
