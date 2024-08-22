import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

export function JoinCommuinityButton({ bookId }: any) {
  const { userData } = useContext(AuthContext);
  console.log(bookId, "--", userData?.books, userData);

  const HandleClick = async () => {
    if (userData?.books.includes(bookId)) {
      console.log("leave");
      const d = doc(db, "users", userData?.userId);
      await updateDoc(d, {
        books: arrayRemove(bookId),
      });
    } else if (!userData?.books.includes(bookId)) {
      console.log("pp");
      const d = doc(db, "users", userData?.userId);
      await updateDoc(d, {
        books: arrayUnion(bookId),
      });
    }
  };
  return (
    <Pressable
      onPress={() => {
        HandleClick();
      }}
    >
      <Text style={{ color: "white" }}>
        {userData?.books.includes(bookId) ? "Leave" : "Join"}{" "}
      </Text>
    </Pressable>
  );
}
