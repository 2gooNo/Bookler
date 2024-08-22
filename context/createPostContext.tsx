import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};
type SelectedTagsType = {
  tagName: string;
};
type SelectedBookType = {
  name: string;
  id: string;
};
type SelectedChapterType = {
  name: string;
  number: number | null;
};
type PostContextType = {
  setSelectedTags: React.Dispatch<React.SetStateAction<SelectedTagsType[]>>;
  selectedTags: SelectedTagsType[];
  setMedia: React.Dispatch<React.SetStateAction<string[]>>;
  media: string[];
  setTakenMedia: React.Dispatch<React.SetStateAction<string>>;
  takenMedia: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setBodyText: React.Dispatch<React.SetStateAction<string>>;
  bodyText: string;
  setLinkUrl: React.Dispatch<React.SetStateAction<string>>;
  linkUrl: string;
  setLinkComponent: React.Dispatch<React.SetStateAction<boolean>>;
  linkComponent: boolean;
  selectedBook: SelectedBookType;
  setSelectedBook: React.Dispatch<React.SetStateAction<SelectedBookType>>;
  selectedChapter: SelectedChapterType;
  setSelectedChapter: React.Dispatch<React.SetStateAction<SelectedChapterType>>;
};
export const CreatePostContext = React.createContext<PostContextType>(
  {} as PostContextType
);

export const CreatePostProvider = ({ children }: Props) => {
  const [selectedTags, setSelectedTags] = useState<SelectedTagsType[]>([]);
  const [media, setMedia] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [bodyText, setBodyText] = useState<string>("");
  const [takenMedia, setTakenMedia] = useState<string>("");
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [linkComponent, setLinkComponent] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<SelectedBookType>({
    id: "",
    name: "",
  });
  const [selectedChapter, setSelectedChapter] = useState<SelectedChapterType>({
    number: null,
    name: "",
  });
  return (
    <CreatePostContext.Provider
      value={{
        selectedTags,
        setSelectedTags,
        media,
        setMedia,
        setTakenMedia,
        takenMedia,
        title,
        setTitle,
        bodyText,
        setBodyText,
        linkUrl,
        setLinkUrl,
        linkComponent,
        setLinkComponent,
        selectedBook,
        selectedChapter,
        setSelectedChapter,
        setSelectedBook,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};

export const useAuth = (): PostContextType => {
  return React.useContext(CreatePostContext);
};
