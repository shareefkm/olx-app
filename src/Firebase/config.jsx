import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCVbJ5uDKmL_QZHin-tU-TOc-ssUGZZ65Y",
  authDomain: "olx-app-de747.firebaseapp.com",
  projectId: "olx-app-de747",
  storageBucket: "olx-app-de747.appspot.com",
  messagingSenderId: "343734356401",
  appId: "1:343734356401:web:5cf7b56f1b18f3f500d590",
  measurementId: "G-T22CBFGM35"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app);
export default app;