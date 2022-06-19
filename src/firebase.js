// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBA2uo-53deRIPjKrdV_mOH_UBMihGDEIw",
    authDomain: "livevideocall-updated.firebaseapp.com",
    databaseURL: "https://livevideocall-updated-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "livevideocall-updated",
    storageBucket: "livevideocall-updated.appspot.com",
    messagingSenderId: "19673148748",
    appId: "1:19673148748:web:7085f8836af31ec83f73e9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);



