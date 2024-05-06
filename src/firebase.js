// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtdHOy5dVSddCRdz_mQmGgsMV2gLSsuAA",
  authDomain: "chakra-reservation.firebaseapp.com",
  databaseURL: "https://chakra-reservation.firebaseio.com",
  projectId: "chakra-reservation",
  storageBucket: "chakra-reservation.appspot.com",
  messagingSenderId: "830300281180",
  appId: "1:830300281180:web:48de2d8bbcb161a5554999"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;