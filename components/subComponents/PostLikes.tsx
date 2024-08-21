import { Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

export function PostLikes({ item }: any) {
  const { userData } = useContext(AuthContext);
  const Vote = (like: number) => {};
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "blue",
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 50,
        alignItems: "center",
        gap: 7,
      }}
    >
      <Pressable onPress={() => Vote(1)}>
        <FontAwesome name="arrow-up" size={20} color="white" />
      </Pressable>
      <Text style={{ color: "white" }}>
        {item?.likes?.reduce(
          (total: number, like: any) => total + (like?.data?.type || 0),
          0
        )}
      </Text>
      <Pressable onPress={() => Vote(-1)}>
        <FontAwesome name="arrow-down" size={20} color="white" />
      </Pressable>
    </View>
  );
}
