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
        height: height * 0.25,
        backgroundColor: "#1c1c1b",
        paddingHorizontal: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            flexDirection: "column",
            gap: 10,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text>Add tags</Text>
            <Pressable>
              <Text>Done</Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <Feather name="hash" size={18} color="#adabaa" />
            {selectedTags?.map((tag, index) => (
              <Pressable
                key={index}
                style={styles.selectedTag}
                onPress={() => removeSelectedTag(tag?.tagName)}
              >
                <Text
                  style={{ color: "white", fontWeight: "500", fontSize: 15 }}
                >
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
              onSubmitEditing={(event) => selectTag(event.nativeEvent.text)}
            />
          </View>
          <ScrollView
            horizontal={true}
            scrollEnabled={true}
            style={{ width: "100%" }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                backgroundColor: "green",
                // width: 1000,
                // overflow: "hidden",
                alignItems: "flex-start",
              }}
            >
              {suggestedTags?.map((tag, index) => (
                <Pressable
                  style={styles.tag}
                  key={index}
                  onPress={() => selectTag(tag?.tagName)}
                >
                  <Text
                    style={{ color: "white", fontWeight: "500", fontSize: 15 }}
                  >
                    #{tag?.tagName}
                  </Text>
                </Pressable>
              ))}

              <Text style={{ color: "white" }}>{newTag}</Text>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
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
