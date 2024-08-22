import { CreatePostContext } from "@/context/createPostContext";
import { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CreatePostButton } from "./CreatePostButton";
import { CreateDraftButton } from "./CreateDraftButton";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/common";

export function ChapterSelect() {
  const { setSelectedChapter, selectedBook } = useContext(CreatePostContext);
  const [book, setBook] = useState<any>();

  const getBook = async () => {
    const docRef = doc(db, "books", selectedBook.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBook(docSnap.data());
    }
  };

  useEffect(() => {
    getBook();
  }, []);
  console.log(book?.chapters);
  return (
    <View style={{ paddingVertical: 40 }}>
      {book?.chapters.map((chapter: string, index: number) => (
        <ChapterCard key={index} chapter={chapter} index={index} />
      ))}
      {/* <CreatePostButton />
      <CreateDraftButton /> */}
    </View>
  );
}

function ChapterCard({ chapter, index }: { chapter: string; index: number }) {
  const { setSelectedChapter, selectedBook, selectedChapter } =
    useContext(CreatePostContext);
  const selectChapter = () => {
    if (selectedChapter.number == index) {
      setSelectedChapter({ name: "", number: null });
    } else {
      setSelectedChapter({ name: chapter, number: index });
    }
  };
  return (
    <Pressable
      onPress={() => selectChapter()}
      style={{
        backgroundColor:
          selectedChapter.number == index ? "grey" : "transparent",
      }}
    >
      <Text style={{ color: "white" }}>
        {index + 1} | {chapter}
      </Text>
    </Pressable>
  );
}
