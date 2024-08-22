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
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function HashTagSelect({ setIsVisible }: any) {
  const { selectedTags, setSelectedTags } = useContext(CreatePostContext);
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
  };

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        height: height * 0.3,
        backgroundColor: "blue",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            flexDirection: "column",
            gap: 10,
            height: "100%",
            justifyContent: "center",
          }}
        >
          <TextInput
            onChangeText={(value) => searchTags(value)}
            style={{ backgroundColor: "green", padding: 10 }}
            onSubmitEditing={(event) => selectTag(event.nativeEvent.text)}
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            {selectedTags?.map((tag, index) => (
              <Pressable
                key={index}
                onPress={() => removeSelectedTag(tag?.tagName)}
              >
                <Text style={{ color: "white", backgroundColor: "gray" }}>
                  {tag?.tagName}
                </Text>
              </Pressable>
            ))}
            {suggestedTags?.map((tag, index) => (
              <Pressable key={index} onPress={() => selectTag(tag?.tagName)}>
                <Text style={{ color: "white" }}>{tag?.tagName}</Text>
              </Pressable>
            ))}
            <Text style={{ color: "white" }}>{newTag}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
