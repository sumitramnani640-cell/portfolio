// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmyoHyGQ1r9GxVI-cMHc7YUsU3ogYDNzU",
  authDomain: "portfoilio-66551.firebaseapp.com",
  projectId: "portfoilio-66551",
  storageBucket: "portfoilio-66551.firebasestorage.app",
  messagingSenderId: "615982514071",
  appId: "1:615982514071:web:912845a5698162dcb28ed2",
  measurementId: "G-MW9B3L3HVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
