import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

export function JoinCommuinityButton({ bookId }: any) {
  const { userData } = useContext(AuthContext);

  const HandleClick = async () => {
    if (userData?.books.includes(bookId)) {
      const d = doc(db, "users", userData?.userId);
      await updateDoc(d, {
        books: arrayRemove(bookId),
      });
    } else if (!userData?.books.includes(bookId)) {
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
      style={{
        backgroundColor: "white",
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 1,
        paddingBottom: 7,
        paddingTop: 7,
        width: 62,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "black",
          fontFamily: "Inherit",
          fontSize: 13,
          fontWeight: "700",
        }}
      >
        {userData?.books.includes(bookId) ? "Гарах" : "Нэгдэх"}
      </Text>
    </Pressable>
  );
}
