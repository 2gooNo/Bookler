import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { PostContext } from "@/context/createPostContext";
import { addDoc, collection, doc } from "firebase/firestore";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

export function CreateDraftButton() {
  const { user } = useContext(AuthContext);
  const { selectedTags, media, title, bodyText } = useContext(PostContext);
  const CreateDraft = async () => {
    try {
      const docRef = await addDoc(collection(db, "drafts"), {
        userId: user.uid,
        userRef: doc(db, "users", user.uid),
        bodyText: bodyText,
        title: title,
        media: media,
        tags: selectedTags,
      });
    } catch (err) {}
  };
  return (
    <Pressable
      onPress={() => CreateDraft()}
      style={{ backgroundColor: "pink" }}
    >
      <Text> Draft</Text>
    </Pressable>
  );
}
