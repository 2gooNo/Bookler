import { db } from "@/common";
import { PostContext } from "@/context/createPostContext";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function HashTagSelect({ navigation }: { navigation: any }) {
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
    console.log(value.length);
    if (value.length > 0) {
      setSelectedTags((prev) => [...prev, { tagName: value }]);
      setSuggestedTags((prev: any) => {
        if (prev && prev.includes(value)) {
          return prev;
        }
      });
    }
  };
  const { height } = Dimensions.get("window");
  return (
    <View
      style={{
        // flexDirection: "column",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        justifyContent: "flex-start",
        backgroundColor: "yellow",
      }}
    >
      <Pressable
        onPress={() => navigation.navigate("CreatePost")}
        style={{
          backgroundColor: "transparent",
          height: "65%",
          minHeight: "40%",
          maxHeight: "65%",
        }}
      ></Pressable>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          height: "35%",
          // maxHeight: "60%",
          backgroundColor: "blue",
        }}
        contentContainerStyle={{
          height: "60%",
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            style={{
              flexDirection: "column",
              gap: 10,
              height: "100%",
              backgroundColor: "purple",
            }}
          >
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
