import { AuthContext } from "@/context/authContext";
import { CreatePostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { View } from "react-native";

export function BookSelect() {
  const { userData } = useContext(AuthContext);
  const { setSelectedBook } = useContext(CreatePostContext);
  return (
    <View>
      {userData?.books.map(({ book, index }: any) => (
        <View></View>
      ))}
    </View>
  );
}
