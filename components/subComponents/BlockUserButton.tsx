import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

export function BlockUserButton({ blockingUser }: any) {
  const { userData } = useContext(AuthContext);
  const blockUser = async () => {
    const d = doc(db, "users", userData?.userId);
    await updateDoc(d, {
      blockedUsers: arrayUnion(blockingUser),
    });
    const docFriend = doc(db, "users", userData?.userId);
    await updateDoc(docFriend, {
      following: arrayRemove(blockingUser),
    });
  };
  return (
    <Pressable onPress={() => blockUser()}>
      <Text style={{ color: "white", fontSize: 17 }}>Block user</Text>
    </Pressable>
  );
}
