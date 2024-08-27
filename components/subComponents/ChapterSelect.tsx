import { CreatePostContext } from "@/context/createPostContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/common";
import AntDesign from "@expo/vector-icons/AntDesign";
import debounce from "lodash/debounce";

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
    <View
      style={{
        paddingTop: 60,
        backgroundColor: "#0d0c0c",
        flexDirection: "column",
        paddingHorizontal: 10,
        height: "100%",
        gap: 25,
        alignItems: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
          alignItems: "center",
          gap: 80,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: "grey",
            fontWeight: "500",
            textAlign: "left",
          }}
        >
          Select chapter
        </Text>
        <Pressable
          style={{
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 5,
          }}
          disabled={selectedChapter.number ? false : true}
          onPress={() => navigation.navigate("CreatePost")}
        >
          <Text
            style={{
              color: selectedChapter.number ? "#1DA1F2" : "grey",
              fontSize: 14,
            }}
          >
            Next
          </Text>
        </Pressable>
      </View>
      <ScrollView style={{ gap: 5, width: "100%" }}>
        {book?.chapters.map((chapter: string, index: number) => (
          <ChapterCard key={index} chapter={chapter} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

function ChapterCard({ chapter, index }: { chapter: string; index: number }) {
  const { setSelectedChapter, selectedChapter } = useContext(CreatePostContext);
  const selectChapter = useCallback(
    debounce(() => {
      console.log(
        selectedChapter,
        selectedChapter.number,
        index,
        selectedChapter.number
      );
      if (selectedChapter.number === index) {
        console.log(selectedChapter);
        setSelectedChapter({ name: "", number: null });
      } else if (chapter) {
        console.log(selectedChapter, chapter, index);
        setSelectedChapter({ name: chapter, number: index + 1 });
      }
    }, 300),
    [selectedChapter, index]
  );

  return (
    <Pressable
      onPress={() => {
        selectChapter();
        console.log(index, chapter);
      }}
      style={{
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 15,
        marginBottom: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            width: 25,
            textAlign: "center",
          }}
        >
          {index + 1}
        </Text>
        <View
          style={{
            width: 1,
            height: "100%",
            backgroundColor: "white",
            marginLeft: 1,
          }}
        />
        <Text style={{ color: "white", fontSize: 16 }}>{chapter}</Text>
      </View>
      {selectedChapter?.number && selectedChapter?.number - 1 === index && (
        <AntDesign name="check" size={20} color="#1DA1F2" />
      )}
    </Pressable>
  );
}
