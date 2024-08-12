"use client";

import { Formik } from "formik";
import { Pressable, TextInput, View, Text } from "react-native";

import { useState } from "react";
import { ChapterCard } from "./ChapterCard";

export function CreateBook() {
  const [chapters, setChapters] = useState<string[]>([]);
  //   const [chapter, setChapter] = useState<string>();
  async function AddChapter() {}
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Formik
        initialValues={{ bookName: "", description: "", chapter: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          // await signUp(values);
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
            <TextInput
              style={{ width: "70%", height: "7%", backgroundColor: "white" }}
              placeholderTextColor="black"
              placeholder="Book Name"
              value={values.bookName}
              onChangeText={handleChange("bookName")}
              onBlur={handleBlur("bookName")}
            />
            <TextInput
              value={values.chapter}
              onChangeText={handleChange("chapter")}
              placeholder="Add Chapter"
              placeholderTextColor="black"
              style={{ width: "70%", height: "7%", backgroundColor: "white" }}
            />
            <Pressable
              style={{ backgroundColor: "white", width: "20%", height: "10%" }}
              onPress={() => {
                setChapters((prev: any) => [...prev, values?.chapter]),
                  setFieldValue("chapter", "");
              }}
            ></Pressable>
            {chapters?.map((chapter, index) => (
              <ChapterCard key={index} chapter={chapter} number={index} />
            ))}
          </View>
        )}
      </Formik>
    </View>
  );
}
