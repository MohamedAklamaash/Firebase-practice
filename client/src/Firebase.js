import {initializeApp} from "firebase/app";

const config = {
  apiKey: "AIzaSyAUc3y-CjIoTtrUxTgroI21N16i6iEhfo8",
  authDomain: "fir-practice-52f3a.firebaseapp.com",
  projectId: "fir-practice-52f3a",
  storageBucket: "fir-practice-52f3a.appspot.com",
  messagingSenderId: "1042706724881",
  appId: "1:1042706724881:web:413a198f0f426944ff99b0",
  measurementId: "G-DDMC8Z95BX",
  databaseURL: "https://fir-practice-52f3a-default-rtdb.firebaseio.com",
};

export const app = initializeApp(config);