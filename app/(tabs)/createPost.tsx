import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreatePostButton } from "@/components/subComponents/CreatePostButton";
import HashTagSelect from "@/components/subComponents/HashTagSelect";
import { PhotoSelector } from "@/components/subComponents/PhotoSelector";
import { PostContext } from "@/context/createPostContext";
import { router } from "expo-router";
import { useContext } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Camera } from "@/components/subComponents/Camera";
import { PhotoConfirm } from "@/components/subComponents/PhotoConfirm";
import { BodyTextInput } from "@/components/subComponents/BodyTextInput";
import { TitleInput } from "@/components/subComponents/TitleInput";
import { SelectedMedia } from "@/components/subComponents/SelectedMedia";
import { CreateDraftButton } from "@/components/subComponents/CreateDraftButton";
import { LinkUrl } from "@/components/subComponents/LinkUrl";

export function CreatePost({ navigation }: { navigation: any }) {
  const { media, linkComponent, setLinkComponent } = useContext(PostContext);
  return (
    <View style={{ paddingVertical: "30%" }}>
      <View style={{ flexDirection: "row" }}>
        <Pressable
          onPress={() => router.push("./home")}
          style={{ backgroundColor: "purple" }}
        >
          <Text style={{ color: "white" }}>Go back</Text>
        </Pressable>
        <CreatePostButton />
        <CreateDraftButton />
      </View>
      <ScrollView horizontal={false}>
        <TitleInput />
        {linkComponent && <LinkUrl />}
        <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
          {media.map((media, index) => (
            <SelectedMedia value={media} key={index} />
          ))}
        </View>
        <BodyTextInput />
      </ScrollView>
      <View style={{ flexDirection: "column" }}>
        <HashTagSelect />
        <View style={{ flexDirection: "row" }}>
          <PhotoSelector />
          <Pressable
            onPress={() => navigation.navigate("Camera")}
            style={{ backgroundColor: "purple", height: 100 }}
          >
            <Text style={{ color: "white" }}>Camera</Text>
          </Pressable>
          <Pressable
            onPress={() => setLinkComponent(!linkComponent)}
            style={{ backgroundColor: "purple", height: 100 }}
          >
            <Text style={{ color: "white" }}>Link</Text>
          </Pressable>
        </View>
      </View>
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
