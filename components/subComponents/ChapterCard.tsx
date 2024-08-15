import { useState } from "react";
import { TextInput, Text, View, Pressable } from "react-native";

export function ChapterCard({
  chapter,
  number,
}: {
  chapter: string;
  number: number;
}) {
  const [editing, setEditing] = useState(false);
  const [chapteer, setChapter] = useState(chapter);

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {editing ? (
        <TextInput
          style={{ color: "white" }}
          value={chapteer}
          onChangeText={setChapter}
          onSubmitEditing={() => setEditing(false)}
        />
      ) : (
        <Text style={{ color: "white" }}>{chapteer}</Text>
      )}
      <Pressable onPress={() => setEditing(!editing)}>
        <Text style={{ color: "white" }}>Edit</Text>
      </Pressable>
    </View>
  );
}
