import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreatePostButton } from "@/components/subComponents/CreatePostButton";
import HashTagSelect from "@/components/subComponents/HashTagSelect";
import { PhotoSelector } from "@/components/subComponents/PhotoSelector";
import { PostContext } from "@/context/createPostContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Camera } from "@/components/subComponents/Camera";
import { PhotoConfirm } from "@/components/subComponents/PhotoConfirm";

export function CreatePost({ navigation }: { navigation: any }) {
  const { images } = useContext(PostContext);

  return (
    <View style={{ paddingVertical: "30%" }}>
      <Pressable
        onPress={() => router.push("./home")}
        style={{ backgroundColor: "purple" }}
      >
        <Text style={{ color: "white" }}>Go back</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Camera")}
        style={{ backgroundColor: "purple", height: 100 }}
      >
        <Text style={{ color: "white" }}>Camera</Text>
      </Pressable>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
        {images.map((image, index) => (
          <Image
            style={{ height: 200, width: "50%" }}
            source={{ uri: image }}
          ></Image>
        ))}
      </View>
      <CreatePostButton />
      <HashTagSelect />
      <PhotoSelector />
    </View>
  );
}
const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="CreatePost"
        component={CreatePost} // rreplace with loginAndSignUp page
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Camera"
        component={Camera} // log in
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PhotoConfirm"
        component={PhotoConfirm} // log in
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
