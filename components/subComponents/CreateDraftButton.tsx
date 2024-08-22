import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { CreatePostContext } from "@/context/createPostContext";
import { LangContext } from "@/context/langContext";
import { homeTranslation } from "@/localization/translate";
import { router } from "expo-router";
import { addDoc, collection, doc } from "firebase/firestore";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

export function CreateDraftButton() {
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
    setBodyText,
    setTitle,
    setMedia,
    setSelectedTags,
    setLinkUrl,
    setSelectedChapter,
    setSelectedBook,
  } = useContext(CreatePostContext);
  const CreateDraft = async () => {
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
        router.push("/home");
      });
    } catch (err) {}
  };
  return (
    <Pressable
      onPress={() => CreateDraft()}
      style={{ backgroundColor: "pink" }}
    >
      <Text> {homeTranslation?.[lang]?.["draft"]}</Text>
    </Pressable>
  );
}
