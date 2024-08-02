import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApXceVcooq0OssYAvdwLX_Khq0Qosd2cM",
  authDomain: "bookler-84df3.firebaseapp.com",
  projectId: "bookler-84df3",
  storageBucket: "bookler-84df3.appspot.com",
  messagingSenderId: "374177049633",
  appId: "1:374177049633:web:13011efd30f5197beb0760",
  measurementId: "G-Y0DYWPSB47",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
