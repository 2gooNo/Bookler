import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { CreatePostContext } from "@/context/createPostContext";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const { height, width } = Dimensions.get("window");

export function BookSelect({ navigation }: any) {
  const { userData } = useContext(AuthContext);
  const { selectedBook } = useContext(CreatePostContext);
  const [searchNumber, setSearchNumber] = useState<number>(5);
  const [books, setBooks] = useState<any[]>([]);

  const GetBooks = async () => {
    if (userData?.books[0]) {
      userData?.books.slice(0, searchNumber).forEach(async (book: any) => {
        const docRef = doc(db, "books", book);
        const docSnap = await getDoc(docRef);

        const bookIds = books.map((book) => book[1]);
        const isNotIncluded = !bookIds.includes(docSnap.id);

        if (docSnap.exists() && isNotIncluded) {
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
      <Text>Post to</Text>
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
      {books[0] ? (
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
  const { setSelectedBook, selectedBook, setSelectedChapter } =
    useContext(CreatePostContext);
  const selectBook = () => {
    if (selectedBook.id == book?.[1]) {
      setSelectedBook({ id: "", name: "" });
      setSelectedChapter({ number: null, name: "" });
    } else {
      setSelectedBook({ id: book?.[1], name: book?.[0]?.name });
    }
  };
  console.log(book?.[0], book?.[0]?.bookImg);
  return (
    <Pressable
      style={{
        width: "100%",
        height: height * 0.08,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: selectedBook.id == book?.[1] ? "grey" : "transparent",
      }}
      onPress={() => selectBook()}
    >
      <Image
        style={{ height: "100%", width: width * 0.15 }}
        source={{ uri: book?.[0]?.bookImg }}
      ></Image>
      <Text style={{ color: "white" }}> {book?.[0]?.name}</Text>
      {selectedBook.id == book?.[1] && (
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
