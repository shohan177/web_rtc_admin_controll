// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTGg1MleH-nQbBgK9i-qR3Qqo_DzQ1CQc",
    authDomain: "final-video-call.firebaseapp.com",
    databaseURL: "https://final-video-call-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "final-video-call",
    storageBucket: "final-video-call.appspot.com",
    messagingSenderId: "85509145950",
    appId: "1:85509145950:web:7cd57a5f6939ebac763bcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
