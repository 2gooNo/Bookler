import { CreatePostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export function CreatePostBookCard({ navigation }: { navigation: any }) {
  const { selectedBook, selectedChapter } = useContext(CreatePostContext);
  return (
    <View style={styles.outerComponent}>
      <View style={styles.innerComponent}>
        <Pressable
          style={{
            backgroundColor: "#1DA1F2",
            borderRadius: 25,
            paddingVertical: 5,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
          }}
          onPress={() => navigation.navigate("BookSelect")}
        >
          <Text
            style={{
              color: "#e8e3e0",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {selectedBook.name}
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#1DA1F2",
            borderRadius: 25,
            paddingVertical: 5,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
          }}
          onPress={() => navigation.navigate("ChapterSelect")}
        >
          <Text
            style={{
              color: "#e8e3e0",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {selectedChapter ? `${selectedChapter.name}` : "Select Chapter..."}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  outerComponent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
    paddingHorizontal: 12,
  },
  innerComponent: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 7,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  image: {},
});
