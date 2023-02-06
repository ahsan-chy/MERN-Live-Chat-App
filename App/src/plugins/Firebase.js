import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  sendPasswordResetEmail, signOut
} from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc, } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDzyjwZtxNvVXWDNFLYmfBpMRuk19vt9ZE",
    authDomain: "firechatc.firebaseapp.com",
    projectId: "firechatc",
    storageBucket: "firechatc.appspot.com",
    messagingSenderId: "727792836656",
    appId: "1:727792836656:web:e82d0cbb970e8ed7a3cdf5",
    measurementId: "G-0V00FZCWQL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     return user;
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// };


// const logout = () => {
//   signOut(auth);
// };
export { auth, app, db, };