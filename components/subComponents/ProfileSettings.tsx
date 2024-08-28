import { AuthContext } from "@/context/authContext";
import { router } from "expo-router";
import { useContext } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function ProfileSettings({ navigation }: any) {
  const { userData } = useContext(AuthContext);
  const { onLogout } = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#121212",
        paddingTop: 50,
        paddingHorizontal: 18,
        flexDirection: "row",
        gap: 10,
      }}
    >
      <View style={{ flexDirection: "column", gap: 20 }}>
        <Foundation name="page-multiple" size={24} color="grey" />
        <FontAwesome name="bookmark" size={24} color="grey" />
        <Entypo name="log-out" size={24} color="grey" />
      </View>
      <View style={{ flexDirection: "column", gap: 20 }}>
        <Pressable
          style={styles.pressable}
          onPress={() => router.navigate(`/draftPage/${userData?.userId}`)}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
            Draft
          </Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => router.navigate(`/favorites/${userData?.userId}`)}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
            Favorites
          </Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => onLogout()}>
          <Text
            style={{
              fontFamily: "Inherit",
              fontSize: 15,
              fontWeight: "500",
              color: "white",
            }}
          >
            Гарах
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  pressable: {
    height: 24,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
