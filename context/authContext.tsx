import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "@/common";
import { onAuthStateChanged } from "firebase/auth";
type Props = {
  children: React.ReactNode;
};
type User = {
  id: string;
};

type AuthContextType = {
  user: User | undefined;
  onLogout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setBirthDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  birthDate: Date | undefined;
};
export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(auth.currentUser);
  const [email, setEmail] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const navigation = useNavigation<any>();

  useEffect(() => {
    setUser(auth.currentUser);
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
      }
    });
    console.log(auth, "set");
    if (user) {
      router.push("./home");
    }
    // const checkUser = async () => {
    //   const user = await AsyncStorage.getItem("@userId");
    //   console.log(user, "0");
    //   if (user) {
    //
    //   }
    // };
    // checkUser();
  }, [auth]);
  const onLogout = async () => {
    // await AsyncStorage.removeItem("@user");
    setUser(undefined);
    signOut(auth);
    navigation.navigate("index");
  };

  return (
    <AuthContext.Provider
      value={{
        onLogout,
        user,
        setUser,
        username,
        setUserName,
        email,
        setEmail,
        birthDate,
        setBirthDate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return React.useContext(AuthContext);
};
