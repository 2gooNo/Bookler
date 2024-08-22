import { CreatePostContext } from "@/context/createPostContext";
import { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export function CreatePostBookCard({ navigation }: { navigation: any }) {
  const { selectedBook, selectedChapter } = useContext(CreatePostContext);
  return (
    <View style={styles.outerComponent}>
      <Image style={styles.image}></Image>
      <View style={styles.innerComponent}>
        <Pressable onPress={() => navigation.navigate("BookSelect")}>
          <Text style={styles.text}>{selectedBook.name}</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("ChapterSelect")}>
          <Text style={styles.text}>
            {selectedChapter.number
              ? `${selectedChapter.number}  -  ${selectedChapter.name}`
              : "Select Chapter..."}
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
    gap: 10,
    paddingHorizontal: 12,
  },
  innerComponent: {
    flexDirection: "column",
    alignItems: "center",
    gap: 7,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  image: {},
});
