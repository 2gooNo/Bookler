import { CreatePostContext } from "@/context/createPostContext";
import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/common";
import AntDesign from "@expo/vector-icons/AntDesign";

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
        // backgroundColor:
        // selectedChapter.number == index ? "grey" : "transparent",
        // borderTopColor: "lightgrey",
        // borderTopWidth: 0.5,
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 15,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          height: "100%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            width: 25,
            textAlign: "center",
          }}
        >
          {index}
        </Text>
        <View
          style={{
            width: 1,
            height: "100%",
            backgroundColor: "white",
            marginLeft: 1,
          }}
        ></View>
        <Text style={{ color: "white", fontSize: 16 }}>{chapter}</Text>
      </View>
      {selectedChapter.number == index && (
        <AntDesign
          name="check"
          size={20}
          color="#1DA1F2"
          style={{ textAlignVertical: "bottom" }}
        />
      )}
    </Pressable>
  );
}
