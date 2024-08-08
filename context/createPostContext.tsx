import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};
type SelectedTagsType = {
  tagName: string;
};
type PostContextType = {
  setSelectedTags: React.Dispatch<React.SetStateAction<SelectedTagsType[]>>;
  selectedTags: SelectedTagsType[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  images: string[];
  setTakenMedia: React.Dispatch<React.SetStateAction<string>>;
  takenMedia: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setBodyText: React.Dispatch<React.SetStateAction<string>>;
  bodyText: string;
};
export const PostContext = React.createContext<PostContextType>(
  {} as PostContextType
);

export const PostProvider = ({ children }: Props) => {
  const [selectedTags, setSelectedTags] = useState<SelectedTagsType[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [bodyText, setBodyText] = useState<string>("");
  const [takenMedia, setTakenMedia] = useState<string>("");
  return (
    <PostContext.Provider
      value={{
        selectedTags,
        setSelectedTags,
        images,
        setImages,
        setTakenMedia,
        takenMedia,
        title,
        setTitle,
        bodyText,
        setBodyText,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const useAuth = (): PostContextType => {
  return React.useContext(PostContext);
};
