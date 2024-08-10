import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/common";

export const mediaUploader = async (
  media: string[]
): Promise<{ url: string; type: string }[]> => {
  try {
    const blobMedia = await uriToBlob(media);
    console.log(blobMedia);
    const sendingFile = await Promise.all(
      blobMedia.map(async (blob) => {
        const imgName = imgNameGenerator();
        const storageRef = ref(storage, imgName);
        const snapshot = await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(snapshot.ref);

        return { url, type: blob.type };
      })
    );
    return sendingFile;
  } catch (error) {
    console.error("Error uploading media:", error);
    return [];
  }
};

const imgNameGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

const uriToBlob = (uris: string[]): Promise<Blob[]> => {
  const promises = uris.map(
    (uri) =>
      new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response as Blob);
        xhr.onerror = () => reject(new Error("uriToBlob failed"));
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      })
  );
  return Promise.all(promises);
};
