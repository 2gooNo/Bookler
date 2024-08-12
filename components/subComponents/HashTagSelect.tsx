import { db } from "@/common";
import { PostContext } from "@/context/createPostContext";
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
    // <View
    //   style={{
    //     flexDirection: "column",
    //     flex: 1,
    //   }}
    // >

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
    // </View>
  );
}
