import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { CreatePostContext } from "@/context/createPostContext";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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

  console.log(userData?.books.length);
  return (
    <View
      style={{
        backgroundColor: "#121212",
        flexDirection: "column",
        paddingVertical: 60,
        width: "100%",
        paddingHorizontal: 10,
        gap: 30,
        height: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          paddingHorizontal: 10,
          alignItems: "center",
          gap: 50,
        }}
      >
        <Pressable onPress={() => navigation.navigate("CreatePost")}>
          <FontAwesome6 name="x" size={15} color="white" />
        </Pressable>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "Inherit",
            textAlign: "center",
            justifyContent: "center",
            fontStyle: "normal",
            fontWeight: "600",
          }}
        >
          Таны нэгдсэн номнууд
        </Text>
        {/* {selectedBook.id && ( */}
        <Pressable
          disabled={selectedBook?.id ? false : true}
          style={
            selectedBook?.id
              ? {
                  borderRadius: 30,
                  padding: 10,
                  elevation: 2,
                  paddingVertical: 15,
                  backgroundColor: "#1DA1F2",
                  width: 67.5,
                  alignItems: "center",
                }
              : { width: "auto" }
          }
          // style={{ backgroundColor: "red" }}
          onPress={() => navigation.navigate("ChapterSelect")}
        >
          <Text
            style={
              selectedBook?.id
                ? { color: "#e8e3e0", fontSize: 15, fontWeight: "bold" }
                : {
                    color: "grey",
                    fontSize: 17,
                  }
            }
          >
            Дараа
          </Text>
        </Pressable>
        {/* )} */}
      </View>
      {books[0] ? (
        books.map((book, index) => <BookCard key={index} book={book} />)
      ) : (
        <Text style={{ color: "grey" }}>
          No books please enter a commuinity first :
        </Text>
      )}

      {searchNumber < userData?.books.length && (
        <Pressable
          onPress={() => {
            setSearchNumber(searchNumber + 5);
          }}
        >
          <Text style={{ color: "grey" }}>More</Text>
        </Pressable>
      )}
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
        // paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 15,
        // backgroundColor: selectedBook.id == book?.[1] ? "grey" : "transparent",
      }}
      onPress={() => selectBook()}
    >
      <Image
        style={{ height: "100%", width: width * 0.15, borderRadius: 15 }}
        source={{ uri: book?.[0]?.bookImg }}
      ></Image>
      <View style={{ flexDirection: "row", gap: 30, alignItems: "center" }}>
        <Text style={{ color: "#e8e3e0", fontSize: 15, fontWeight: "bold" }}>
          {" "}
          {book?.[0]?.name}
        </Text>
        {selectedBook.id == book?.[1] && (
          <AntDesign
            name="check"
            size={30}
            color="#1DA1F2"
            style={{ textAlignVertical: "bottom" }}
          />
        )}
      </View>
    </Pressable>
  );
}
