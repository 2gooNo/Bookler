import { CreatePostContext } from "@/context/createPostContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/common";
import AntDesign from "@expo/vector-icons/AntDesign";
import debounce from "lodash/debounce";

export function ChapterSelect({ navigation }: any) {
  const { setSelectedChapter, selectedBook, selectedChapter }: any =
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
        <Text style={{ color: "#e8e3e0", fontSize: 15, fontWeight: "bold" }}>
          Select chapter
        </Text>
        <Pressable
          style={{
            borderRadius: 30,
            padding: 10,
            elevation: 2,
            paddingVertical: 15,
            backgroundColor: "#1DA1F2",
            width: 75,
            alignItems: "center",
          }}
          disabled={selectedChapter.number ? false : true}
          onPress={() => navigation.navigate("CreatePost")}
        >
          <Text
            style={
              selectedChapter?.number
                ? { color: "white", fontSize: 15, fontWeight: "bold" }
                : { width: "auto" }
            }
          >
            Дараах
          </Text>
        </Pressable>
      </View>
      <ScrollView style={{ gap: 5, width: "100%" }}>
        {book?.chapters?.map((chapter: string, index: number) => (
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
      // console.log(
      //   selectedChapter,
      //   selectedChapter.number,
      //   index,
      //   selectedChapter.number
      // );

      if (selectedChapter?.number && selectedChapter?.number - 1 === index) {
        console.log("00000", selectedChapter);
        setSelectedChapter({ name: "", number: null });
      } else if (chapter) {
        console.log("111", selectedChapter, chapter, index);

        setSelectedChapter({ name: chapter, number: index + 1 });
      }
    }, 300),
    [selectedChapter, index]
  );
  // console.log(selectedChapter, "ypu fu kcer");
  return (
    <Pressable
      onPress={() => {
        console.log("0");
        selectChapter();
        console.log("1");
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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <Text style={{ color: "#e8e3e0", fontSize: 18, fontWeight: "bold" }}>
          {index + 1}
        </Text>
        {/* <View
          style={{
            width: 1,
            height: "100%",
            backgroundColor: "white",
            marginLeft: 1,
          }}
        /> */}
        <Text
          style={{
            width: 400,
            color: "#e8e3e0",
            fontSize: 13,
            fontWeight: "bold",
          }}
        >
          {chapter}
        </Text>
      </View>
      {selectedChapter?.number && selectedChapter?.number - 1 === index ? (
        <AntDesign name="check" size={20} color="white" />
      ) : (
        ""
      )}
    </Pressable>
  );
}
