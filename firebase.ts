import { initializeApp, getApp, getApps } from "firebase/app";

import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmfT-1a5VeAEP_lVJmTr9kGeBMoxWAHyA",
  authDomain: "markdown-8c813.firebaseapp.com",
  databaseURL: "https://markdown-8c813-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "markdown-8c813",
  storageBucket: "markdown-8c813.appspot.com",
  messagingSenderId: "345799569743",
  appId: "1:345799569743:web:01e84d2d4f3b7249ba953a"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getDatabase(app);
export default app;
