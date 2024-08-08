import { auth } from "@/common";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
type Props = {
  children: React.ReactNode;
};

type LangContextType = {
  lang: "en" | "mn";
  setLang: React.Dispatch<React.SetStateAction<"en" | "mn">>;
};
export const LangContext = React.createContext<LangContextType>(
  {} as LangContextType
);

export const LangProvider = ({ children }: Props) => {
  const { userData } = useContext(AuthContext);
  const [lang, setLang] = useState<"en" | "mn">("mn");
  useEffect(() => {
    if (!auth?.currentUser) {
      setLang("en");
    } else if (auth?.currentUser) {
      setLang(userData?.defaultLang);
    }
  }, [auth]);

  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

export const useAuth = (): LangContextType => {
  return React.useContext(LangContext);
};
