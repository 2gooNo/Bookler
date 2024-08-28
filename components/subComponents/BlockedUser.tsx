import { db } from "@/common";
import { AuthContext } from "@/context/authContext";
import { router } from "expo-router";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";

export function BlockedUser({ userId, youBlocked }: any) {
  const { userData } = useContext(AuthContext);
  const unblockUser = async () => {
    console.log(userId, userData?.userId);
    const d = doc(db, "users", userData?.userId);
    await updateDoc(d, {
      blockedUsers: arrayRemove(userId),
    });
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        height: "100%",
        width: "100%",
      }}
    >
      {youBlocked ? (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
            You have this user blocked would you like to unblock them
          </Text>
          <Pressable onPress={() => unblockUser()}>
            <Text style={{ color: "#1DA1F2", fontSize: 16 }}>Unblock user</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/home")}>
            <Text style={{ color: "grey", fontSize: 16 }}>Go back</Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            This user has you blocked
          </Text>
          <Pressable onPress={() => router.push("/home")}>
            <Text style={{ color: "grey", fontSize: 16 }}>Go back</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
