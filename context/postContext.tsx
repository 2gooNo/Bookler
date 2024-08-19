import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};
type PostContextType = {
  currentPostData: any;
  setCurrentPostData: React.Dispatch<any>;
};
export const PostContext = React.createContext<PostContextType>(
  {} as PostContextType
);

export const Postprovider = ({ children }: Props) => {
  const [currentPostData, setCurrentPostData] = useState<any>(null);

  return (
    <PostContext.Provider
      value={{
        currentPostData,
        setCurrentPostData,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const useAuth = (): PostContextType => {
  return React.useContext(PostContext);
};
