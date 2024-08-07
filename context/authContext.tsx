import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "@/common";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "@/common";
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  Query,
  query,
  where,
  getDoc,
} from "firebase/firestore";
type Props = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: any | undefined;
  userData: any | undefined;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  onLogout: () => void;
  setUser: React.Dispatch<React.SetStateAction<any | undefined>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setBirthDate: React.Dispatch<React.SetStateAction<Date | undefined | string>>;
  birthDate: Date | undefined | string;
};
export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(auth.currentUser);
  const [userData, setUserData] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | undefined | string>();
  const navigation = useNavigation<any>();

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const q = query(
          collection(db, "users"),
          where("userId", "==", firebaseUser.uid)
        );
        onSnapshot(q, (snapshot) => {
          const userInfo = snapshot.docs.map((doc) => {
            setUserData(doc.data());
          });
        });
      }
    });
  }, [auth]);

  const onLogout = async () => {
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
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return React.useContext(AuthContext);
};
function getDocs(q: Query<DocumentData, DocumentData>) {
  throw new Error("Function not implemented.");
}
