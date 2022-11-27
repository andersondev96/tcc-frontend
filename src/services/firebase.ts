import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCTJ7rse2VBfSy1RIpyj-o4taR-1fkqDVA",
    authDomain: "start-business-auth.firebaseapp.com",
    projectId: "start-business-auth",
    storageBucket: "start-business-auth.appspot.com",
    messagingSenderId: "458796218917",
    appId: "1:458796218917:web:3fdd5f3999240387c71dcc",
    measurementId: "G-FTXF9TY70L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);