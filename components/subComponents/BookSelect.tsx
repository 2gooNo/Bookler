import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { CreatePostContext } from "@/context/createPostContext";
import {
  collection,
  doc,
  getDoc,
  getDocFromCache,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

export function BookSelect({ navigation }: any) {
  const { userData } = useContext(AuthContext);
  const { setSelectedBook, selectedBook } = useContext(CreatePostContext);
  const [searchNumber, setSearchNumber] = useState<number>(5);
  const [books, setBooks] = useState<any[]>([]);
  // const [selectedBook, setSelectedBook] = useState<string>()
  const GetBooks = async () => {
    if (userData?.books[0]) {
      userData?.books.slice(0, searchNumber).forEach(async (book: any) => {
        const docRef = doc(db, "books", book);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBooks((prev) => [...prev, [docSnap.data(), docSnap.id]]);
        }
      });
    }
  };
  useEffect(() => {
    GetBooks();
  }, [userData, searchNumber]);

  return (
    <View
      style={{
        backgroundColor: "#121212",
        flexDirection: "column",
        paddingVertical: 60,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Pressable
          onPress={() => navigation.navigate("CreatePost")}
        ></Pressable>
        {selectedBook.id && (
          <Pressable
            style={{ backgroundColor: "red" }}
            onPress={() => navigation.navigate("ChapterSelect")}
          >
            <Text style={{ color: "white" }}>Next</Text>
          </Pressable>
        )}
      </View>
      {books ? (
        books.map((book, index) => <BookCard key={index} book={book} />)
      ) : (
        <Text style={{ color: "grey" }}>
          No books please enter a commuinity first :)
        </Text>
      )}

      <Pressable
        onPress={() => {
          setSearchNumber(searchNumber + 5);
        }}
      >
        <Text style={{ color: "grey" }}>More</Text>
      </Pressable>
    </View>
  );
}
function BookCard({ book }: any) {
  const { setSelectedBook, selectedBook } = useContext(CreatePostContext);
  const selectBook = () => {
    if (selectedBook.id == book?.[1]) {
      setSelectedBook({ id: "", name: "" });
    } else {
      setSelectedBook({ id: book?.[1], name: book?.[0]?.name });
    }
  };
  return (
    <Pressable
      style={{
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: selectedBook.id == book?.[1] ? "grey" : "transparent",
      }}
      onPress={() => selectBook()}
    >
      <Image style={{ height: "100%" }}></Image>
      <Text style={{ color: "white" }}> {book?.[0]?.name}</Text>
    </Pressable>
  );
}
