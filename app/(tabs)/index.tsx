import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "@/components/subComponents/logIn";
import { SignUp } from "@/components/subComponents/signUp";
import { LogAndSign } from "@/components/subComponents/LogAndSign";
import { PasswordConfirm } from "@/components/subComponents/passwordConfirm";

// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   onSnapshot,
//   query,
// } from "firebase/firestore";
// import { db } from "@/common";

// function HomeScreen({ navigation }: { navigation: any }) {
//   const getPostsAndUserInfo = async () => {
//     const q = query(collection(db, "posts"));

//     onSnapshot(q, async (snapshot) => {
//       console.log(snapshot, "-");
//       const userPromises = snapshot.docs.map((postDoc) => {
//         const postData = postDoc.data();
//         console.log(postData);
//         const userRef = postData.userRef;
//         console.log(userRef);
//         return getDoc(userRef)
//           .then((userDoc) => {
//             if (userDoc.exists()) {
//               return {
//                 post: postData,
//                 user: userDoc.data(),
//               };
//             }
//           })
//           .catch((error) => {
//             console.error(error);
//             return {
//               post: postData,
//               user: null,
//             };
//           });
//       });
//       console.log(console.log(userPromises, "--"));
//       try {
//         // const postsWithUserInfo = await Promise.all(userPromises);
//         // console.log(postsWithUserInfo);
//       } catch (error) {
//         console.error(error);
//       }
//     });
//   };

//   return (
//     <View style={{ backgroundColor: "grey", height: "100%" }}>
//       <Pressable
//         onPress={() => navigation.navigate("SignUp")}
//         style={{ top: 100, backgroundColor: "pink" }}
//       >
//         <Text style={{ color: "white", top: 100 }}>oncluf</Text>
//       </Pressable>
//       <Pressable
//         onPress={() => navigation.navigate("Login")}
//         style={{ top: 100, backgroundColor: "green" }}
//       >
//         <Text style={{ color: "white", top: 100 }}>Log in</Text>
//       </Pressable>

//       <Pressable
//         onPress={() => getPostsAndUserInfo()}
//         style={{ top: 100, backgroundColor: "yellow" }}
//       >
//         <Text style={{ color: "white", top: 100 }}>Log in</Text>
//       </Pressable>
//     </View>
//   );
// }

const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="LogAndSign"
        component={LogAndSign} // rreplace with loginAndSignUp page
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Login"
        component={Login} // log in
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SignUp"
        component={SignUp} // sign up page
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PasswordConfirm"
        component={PasswordConfirm} // sign up page
        options={{ headerShown: false }}
      />
      {/* <HomeStack.Screen
        name="ForgotPassword"
        component={HomeScreen} forgot pass word page 
        options={{ headerShown: false }}
      /> */}
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({});
