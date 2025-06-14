import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcEn21TygkF_xdJ37X4WqxiYzb1knSwN4",
  authDomain: "booking-app-242b5.firebaseapp.com",
  projectId: "booking-app-242b5",
  storageBucket: "booking-app-242b5.firebasestorage.app",
  messagingSenderId: "453367090063",
  appId: "1:453367090063:web:27562df6f282136c7f19fa",
  measurementId: "G-VQLB9BD4TX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
