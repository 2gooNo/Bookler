import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreatePostButton } from "@/components/subComponents/CreatePostButton";
import HashTagSelect from "@/components/subComponents/HashTagSelect";
import { PhotoSelector } from "@/components/subComponents/PhotoSelector";
import { PostContext } from "@/context/createPostContext";
import { router } from "expo-router";
import { useContext } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Camera } from "@/components/subComponents/Camera";
import { PhotoConfirm } from "@/components/subComponents/PhotoConfirm";
import { BodyTextInput } from "@/components/subComponents/BodyTextInput";
import { TitleInput } from "@/components/subComponents/TitleInput";
import { Video } from "expo-av";

export function CreatePost({ navigation }: { navigation: any }) {
  const { media } = useContext(PostContext);

  return (
    <ScrollView style={{ paddingVertical: "30%" }}>
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
        {media.map((media, index) => (
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}
          >
            {media.slice(-4) == ".jpg" ? (
              <Image
                key={index}
                style={{ height: 200, width: "50%" }}
                source={{ uri: media }}
              ></Image>
            ) : (
              <Video
                key={index}
                // posterSource={ImageProps[media]}
                shouldPlay={false}
                isMuted={false}
                style={{ height: 200, width: "50%" }}
                source={{ uri: media }}
              ></Video>
            )}
          </View>
        ))}
      </View>
      <TitleInput />
      <BodyTextInput />
      <CreatePostButton />
      <HashTagSelect />
      <PhotoSelector />
    </ScrollView>
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
