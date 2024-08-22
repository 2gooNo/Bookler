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

export function BookSelect() {
  const { userData } = useContext(AuthContext);
  const { setSelectedBook } = useContext(CreatePostContext);
  const [searchNumber, setSearchNumber] = useState<number>(5);
  const [books, setBooks] = useState<any[]>([]);

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

    // const q = query(
    //     collection(db, "books"),
    //     where("_name_"==),
    //     limit(4)
    //   );
  };

  useEffect(() => {
    GetBooks();
  }, [userData, searchNumber]);

  return (
    <View style={{ backgroundColor: "#121212", flexDirection: "column" }}>
      {/* {userData?.books.map(({ book, index }: any) => (
        <View></View>
      ))} */}
      {books ? (
        <View></View>
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
      <BookCard />
    </View>
  );
}
function BookCard() {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "transparent",
      }}
    >
      <Image style={{ height: "100%" }}></Image>
      <Text></Text>
    </View>
  );
}
