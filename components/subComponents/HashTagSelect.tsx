import { db } from "@/common";
import { PostContext } from "@/context/createPostContext";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
} from "firebase/firestore";
import { Dispatch, useContext, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function HashTagSelect({}: {}) {
  const { selectedTags, setSelectedTags } = useContext(PostContext);
  const [allTags, setAllTags] = useState<any[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<any[]>([]);
  const [newTag, setNewTag] = useState<string | undefined>();

  const searchTags = (value: string) => {
    setSuggestedTags([]);
    if (value.length !== 0) {
      const q = query(collection(db, "tags"));

      onSnapshot(q, (snapshot) => {
        const tagInfo = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setAllTags(tagInfo);
      });

      allTags.forEach((tag) => {
        if (
          tag.tagName.includes(value) &&
          !selectedTags.some(
            (selectedTag) => selectedTag.tagName === tag.tagName
          )
        ) {
          setSuggestedTags((prev) => [...prev, tag]);
        }
      });
    }
    // if (value.length !== 0) {
    //   const q = query(
    //     collection(db, "tags"),
    //     where("tagName", ">=", value),
    //     where("tagName", "<=", value + "\uf8ff"),
    //     limit(10)
    //   );

    //   onSnapshot(q, (snapshot) => {
    //     const tagInfo = snapshot.docs
    //       .map((doc) => {
    //         const docData = [doc.data(), doc.id];
    //         const isAlreadySelected = selectedTags.some(
    //           (tag: any) => tag[1] === doc.id
    //         );
    //         if (!isAlreadySelected) {
    //           return docData;
    //         }
    //         return null;
    //       })
    //       .filter((doc) => doc !== null);
    //     if (tagInfo[0] && !enter) {
    //       console.log(tagInfo);
    //       setTags(tagInfo);
    //     } else if (enter && !tagInfo[0]) {
    //       createNewtag(value);
    //     } else {
    //       setTags([]);
    //       setNewTag(value);
    //     }
    //   });
    // } else {
    //   setTags([]);
    //   setNewTag(undefined);
    // }
  };
  //   const createNewtag = async (tag: string) => {
  //     const docRef = await addDoc(collection(db, "tags"), {
  //       tagName: tag,
  //     });
  //     const docSnap = await getDoc(docRef);
  //     console.log(docSnap.data());
  //     setSelectedTags((prev: any) => [...prev, [docSnap.data(), docSnap.id]]);
  //   };
  const removeSelectedTag = (value: string) => {
    setSelectedTags((prev: any) => {
      if (prev.includes(value)) {
        return prev;
      }
    });
  };
  const selectTag = (value: string) => {
    setSelectedTags((prev) => [...prev, { tagName: value }]);
    setSuggestedTags((prev: any) => {
      console.log(prev, value);
      if (prev.includes(value)) {
        return prev;
      }
    });
  };

  return (
    <View style={{ marginTop: 100 }}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {selectedTags?.map((tag: any, index: any) => (
          <Pressable onPress={() => removeSelectedTag(tag?.tagName)}>
            <Text style={{ color: "white", backgroundColor: "gray" }}>
              {tag?.tagName}
            </Text>
          </Pressable>
        ))}
        {suggestedTags?.map((tag, index) => (
          <Pressable onPress={() => selectTag(tag?.tagName)}>
            <Text style={{ color: "white" }}>{tag?.tagName}</Text>
          </Pressable>
        ))}
        <Text style={{ color: "white" }}>{newTag}</Text>
      </View>
      <TextInput
        onChangeText={(value) => searchTags(value)}
        style={{ backgroundColor: "green" }}
        onSubmitEditing={(event) => selectTag(event.nativeEvent.text)}
      ></TextInput>
    </View>
  );
}
