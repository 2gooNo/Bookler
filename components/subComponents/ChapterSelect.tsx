import { CreatePostContext } from "@/context/createPostContext";
import { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/common";

export function ChapterSelect({ navigation }: any) {
  const { setSelectedChapter, selectedBook, selectedChapter } =
    useContext(CreatePostContext);
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
    if (!selectedBook.name) {
      setSelectedChapter({ name: "", number: null });
    }
  }, [selectedBook]);

  return (
    <View style={{ paddingVertical: 40 }}>
      {selectedChapter.number && (
        <Pressable
          style={{ backgroundColor: "red" }}
          onPress={() => navigation.navigate("CreatePost")}
        >
          <Text style={{ color: "white" }}>Next</Text>
        </Pressable>
      )}
      {book?.chapters.map((chapter: string, index: number) => (
        <ChapterCard key={index} chapter={chapter} index={index} />
      ))}
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
