import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

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
  setBirthDate: React.Dispatch<React.SetStateAction<Date>>;
  birthDate: Date;
};
export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>();
  const [email, setEmail] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date>("");
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@userId");
      console.log(user, "0");
      if (user) {
        router.push("home");
      }
    };
    checkUser();
  }, []);
  const onLogout = async () => {
    await AsyncStorage.removeItem("@user");
    setUser(undefined);
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
