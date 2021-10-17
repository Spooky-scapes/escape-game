import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDVEhi15XmZFl4oRR1UTHEPJ8NiyCRru_8",
  authDomain: "spooky-scapes.firebaseapp.com",
  projectId: "spooky-scapes",
  storageBucket: "spooky-scapes.appspot.com",
  messagingSenderId: "616284930830",
  appId: "1:616284930830:web:c866ffe32a0a8a5fe90d5f",
  measurementId: "G-2KJJP748RW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

ReactDOM.render(
 // <React.StrictMode>
    <App />,
 // </React.StrictMode>,
  document.getElementById('root')
);



