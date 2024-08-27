import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";

export function BlockedUser({ userId, youBlocked }: any) {
  const { userData } = useContext(AuthContext);
  const unblockUser = () => {};
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      {youBlocked ? (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>
            You have this user blocked would you like to unblock them
          </Text>
          <Pressable onPress={() => unblockUser()}>
            <Text style={{ color: "white" }}>Unblock user</Text>
          </Pressable>
          <Pressable>
            <Text style={{ color: "white" }}>Go back</Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>This user has you blocked </Text>
          <Pressable>
            <Text style={{ color: "white" }}>Go back</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
