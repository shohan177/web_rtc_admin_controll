// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfYVDGoIR3-fU4yQrguq7d1EyDJgv9BxE",
    authDomain: "livechatdatabase.firebaseapp.com",
    databaseURL:
        "https://livechatdatabase-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "livechatdatabase",
    storageBucket: "livechatdatabase.appspot.com",
    messagingSenderId: "1040328045300",
    appId: "1:1040328045300:web:cd13a33e3e730f60ebe4a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
