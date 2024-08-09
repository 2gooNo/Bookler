import { onSnapshot } from "firebase/firestore";

export const firebaseActions = async (q: any) => {
  let result: any;
  onSnapshot(q, async (snapshot: any) => {
    const tagInfo = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      tagName: doc.data().tagName,
    }));
    result = await tagInfo;
    console.log({ result });
  });
  return result;
};
