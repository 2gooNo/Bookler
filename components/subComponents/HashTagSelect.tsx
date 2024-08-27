import { db } from "@/common";
import { CreatePostContext } from "@/context/createPostContext";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function HashTagSelect({ setIsVisible, setScrolling }: any) {
  const { selectedTags, setSelectedTags } = useContext(CreatePostContext);
  const [allTags, setAllTags] = useState<any[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<any[]>([]);
  const [newTag, setNewTag] = useState<string | undefined>();

  const searchTags = (value: string) => {
    setSuggestedTags([]);
    setNewTag("");
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
          tag?.tagName?.includes(value) &&
          !selectedTags?.some(
            (selectedTag) => selectedTag?.tagName === tag?.tagName
          )
        ) {
          setSuggestedTags((prev) => [...prev, tag]);
        }
      });
      if (
        !selectedTags?.some((selectedTag) => selectedTag?.tagName === value) &&
        suggestedTags?.[0]
      ) {
        setNewTag(value);
      }
    } else {
      setNewTag("");
      setSuggestedTags([]);
    }
  };

  const removeSelectedTag = (value: string) => {
    setSelectedTags((prev: any) => {
      if (prev?.includes(value)) {
        return prev;
      }
    });
  };
  const selectTag = (value: string) => {
    if (value?.length > 0) {
      setSelectedTags((prev) => [...prev, { tagName: value }]);
      setSuggestedTags((prev: any) => {
        if (prev && prev?.includes(value)) {
          return prev;
        }
      });
    }
  };
  console.log(selectedTags);
  const { height } = Dimensions.get("window");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        height: height * 0.3,
        backgroundColor: "#1c1c1b",
        paddingHorizontal: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
      }}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      <View
        style={{
          flexDirection: "column",
          gap: 20,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "65%",
            alignSelf: "flex-end",
          }}
        >
          <Text style={{ color: "white", fontWeight: "400", fontSize: 18 }}>
            Add tags
          </Text>
          <Pressable onPress={() => setIsVisible(false)}>
            <Text style={{ color: "#1DA1F2", fontWeight: "500", fontSize: 18 }}>
              Done
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <Feather name="hash" size={18} color="#adabaa" />
          {selectedTags?.map((tag, index) => (
            <Pressable
              key={index}
              style={styles.selectedTag}
              onPress={() => removeSelectedTag(tag?.tagName)}
            >
              <Text style={{ color: "white", fontWeight: "500", fontSize: 15 }}>
                #{tag?.tagName}
              </Text>
            </Pressable>
          ))}
          <TextInput
            placeholder="Add a tag.."
            placeholderTextColor={"#adabaa"}
            onChangeText={(value) => searchTags(value)}
            style={{
              flex: 1,
              width: "auto",
              paddingHorizontal: 10,
              fontSize: 15,
              color: "#adabaa",
              // backgroundColor: "yellow",
            }}
            autoFocus={true}
            onSubmitEditing={(event) => {
              selectTag(event?.nativeEvent?.text);
            }}
          />
        </View>
        <ScrollView
          horizontal={true}
          scrollEnabled={true}
          // style={{ flexDirection: "row", width: "100%" }}
          onScrollBeginDrag={() => setScrolling(true)}
          onScrollEndDrag={() => setScrolling(false)}
          contentContainerStyle={{
            flexDirection: "row",
            gap: 5,
            width: 1000,
            // overflow: "hidden",
            alignItems: "flex-start",
          }}
        >
          {/* <View
              style={{
                flexDirection: "row",
                gap: 10,
                backgroundColor: "green",
                width: "100%",
                // overflow: "hidden",
                alignItems: "flex-start",
              }}
            > */}
          {suggestedTags?.map((tag, index) => (
            <Pressable
              style={styles.tag}
              key={index}
              onPress={() => selectTag(tag?.tagName)}
            >
              <Text style={{ color: "white", fontWeight: "500", fontSize: 15 }}>
                #{tag?.tagName}
              </Text>
            </Pressable>
          ))}
          {newTag && (
            <Pressable style={styles.tag} onPress={() => selectTag(newTag)}>
              <Text style={{ color: "white", fontWeight: "500", fontSize: 15 }}>
                {newTag}
              </Text>
            </Pressable>
          )}
          {/* </View> */}
        </ScrollView>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 40,
    borderColor: "white",
    borderWidth: 0.5,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  selectedTag: {
    borderRadius: 40,
    // borderColor: "white",
    borderWidth: 0.5,
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: "#1DA1F2",
  },
});
