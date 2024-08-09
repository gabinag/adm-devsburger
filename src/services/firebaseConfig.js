import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqRysPHm3u_CVaGFPCv1_ymySWnk1q_jM",
  authDomain: "admin-devsburger.firebaseapp.com",
  projectId: "admin-devsburger",
  storageBucket: "admin-devsburger.appspot.com",
  messagingSenderId: "1038833007363",
  appId: "1:1038833007363:web:2808d68f69753303110736"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);