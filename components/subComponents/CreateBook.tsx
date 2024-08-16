"use client";

import { Formik } from "formik";
import {
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  View,
  Text,
  Platform,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { ChapterCard } from "./ChapterCard";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import UserIcon from "@/assets/images/UserIcon";
import { SelectedMedia } from "./SelectedMedia";
import { db } from "@/common";
import { mediaUploader } from "@/utils/image-uploader";
import DropDownPicker from "react-native-dropdown-picker";
import RNPickerSelect from "react-native-picker-select";

export function CreateBook() {
  const [categories, setCategories] = useState<any>([]);
  const [bookUri, setBookUri] = useState<any>();
  async function fetchCategory() {
    const q = query(collection(db, "categories"));
    onSnapshot(q, async (snapshot) => {
      const userPromises = snapshot.docs.map((postDoc) => {
        setCategories((prev: any) => [...prev, postDoc.data()]);
      });
    });
  }
  useEffect(() => {
    fetchCategory();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      result?.assets.forEach((image) => {
        setBookUri(image?.uri);
      });
    }
  };
  async function addBook(values: {
    bookName: string;
    description: string;
    chapters: never[];
    chapter: string;
    categoryId: string;
  }) {
    const uploadedMedia = await mediaUploader([bookUri]);
    try {
      const docRef = await addDoc(collection(db, "books"), {
        name: values?.bookName,
        description: values?.description,
        chapters: values?.chapters,
        bookImg: uploadedMedia[0]?.url,
        // category:
      });
    } catch (err) {}
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ width: "100%", height: "100%" }}>
        <Formik
          initialValues={{
            bookName: "",
            description: "",
            chapters: [],
            chapter: "",
            categoryId: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values);
            await addBook(values);
          }}
        >
          {({
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            values,
            errors,
          }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                gap: 5,
              }}
            >
              <View
                style={{
                  position: "relative",
                }}
              >
                <View style={styles.nextButton}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Inter",
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    Add Book
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: "3%",
                    paddingRight: "3%",
                    borderRadius: 18,
                    width: "30%",
                    height: "100%",
                    zIndex: 5,
                  }}
                >
                  <Button title="" onPress={() => handleSubmit()}></Button>
                </View>
              </View>
              <TextInput
                style={{ width: "70%", height: "7%", backgroundColor: "white" }}
                placeholderTextColor="black"
                placeholder="Book Name"
                value={values?.bookName}
                onChangeText={handleChange("bookName")}
                onBlur={handleBlur("description")}
              />
              <TextInput
                style={{ width: "70%", height: "7%", backgroundColor: "white" }}
                placeholderTextColor="black"
                placeholder="Description"
                value={values?.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
              />
              <TextInput
                onChangeText={handleChange("chapter")}
                value={values?.chapter}
                placeholder="Add Chapter"
                placeholderTextColor="black"
                style={{ width: "70%", height: "7%", backgroundColor: "white" }}
              />
              <Pressable
                style={{
                  backgroundColor: "white",
                  width: "20%",
                  height: "10%",
                }}
                onPress={() => {
                  setFieldValue("chapters", [
                    ...values?.chapters,
                    values?.chapter,
                  ]),
                    setFieldValue("chapter", "");
                }}
              ></Pressable>
              {values?.chapters?.map((chapter, index) => (
                <ChapterCard key={index} chapter={chapter} number={index} />
              ))}
              {bookUri ? (
                <Pressable onPress={pickImage}>
                  <SelectedMedia value={bookUri} />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    pickImage(), setFieldValue("bookUrl", bookUri);
                  }}
                >
                  <UserIcon />
                </Pressable>
              )}
              <View style={{ gap: 10 }}>
                {categories?.map(
                  (category: { name: String }, index: number) => (
                    <Pressable
                      key={index}
                      onPress={() =>
                        setFieldValue("categoryId", category?.name)
                      }
                    >
                      <Text style={{ color: "white" }}>{category?.name}</Text>
                    </Pressable>
                  )
                )}
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "black",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    paddingTop: "18%",
    alignItems: "center",
  },
  upperText: {
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    width: "100%",
    letterSpacing: 1,
    marginBottom: "20%",
    paddingLeft: "8%",
  },
  xLogo: {
    marginBottom: "10%",
    width: "10%",
    height: "10%",
  },
  input: {
    height: "auto",
    paddingBottom: "3%",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(98,101,105)",
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "400",
    color: "rgb(74,153,233)",
  },
  nextButton: {
    backgroundColor: "white",
    paddingBottom: "2%",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
    borderRadius: 18,
    zIndex: 1,
  },
});
