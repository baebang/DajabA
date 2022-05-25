// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//개같은 버전문제로 인한 import 변경, 공식문서 개....
// import firebase from "firebase/app";
// import  "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAqEwnTSVCukmuYHpQb112A_f8-HDDTrIY",
  authDomain: "test-61805.firebaseapp.com",
  projectId: "test-61805",
  storageBucket: "test-61805.appspot.com",
  messagingSenderId: "543354547243",
  appId: "1:543354547243:web:e2e3da86eb297dfdeece6e",
  measurementId: "G-FJ7VHR6S8Z"
};

firebase.initializeApp (firebaseConfig);

 const firestore = firebase.firestore();
// Initialize Firebase

export const firebaseInstance = firebase; 
export const authService = firebase.auth();


export { firestore };

