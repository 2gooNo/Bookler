import { db } from "@/common";
import { router } from "expo-router";
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function HashTagSelect() {
  const [tags, setTags] = useState<DocumentData[] | undefined>();
  const [newTag, setNewTag] = useState<string | undefined>();
  const searchTags = (value: string) => {
    console.log(value.length, "-");
    if (value.length !== 0) {
      const q = query(
        collection(db, "tags"),
        where("tagName", ">=", value),
        where("tagName", "<=", value + "\uf8ff"),
        limit(10)
      );

      onSnapshot(q, (snapshot) => {
        const tagInfo = snapshot.docs.map((doc) => {
          return doc.data();
        });
        if (tagInfo) {
          setTags(tagInfo);
        } else {
          setNewTag(value);
        }
      });
    }
  };
  return (
    <View>
      <Pressable
        onPress={() => router.push("./home")}
        style={{ backgroundColor: "purple" }}
      >
        <Text style={{ color: "white" }}>Go back</Text>
      </Pressable>
      <View style={{ flexDirection: "row" }}>
        {tags?.map((tag, index) => (
          <Text style={{ color: "white" }}>{tag?.tagName}</Text>
        ))}
        <Text style={{ color: "white" }}>{newTag}</Text>
      </View>
      <TextInput
        onChangeText={(value) => searchTags(value)}
        style={{ backgroundColor: "green" }}
      ></TextInput>
    </View>
  );
}
