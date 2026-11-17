
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCWVV2wRN0k3LGNKHfLIjll_Y6TkB4lBEE",
    authDomain: "todo-list-with-firestore-ef897.firebaseapp.com",
    projectId: "todo-list-with-firestore-ef897",
    storageBucket: "todo-list-with-firestore-ef897.firebasestorage.app",
    messagingSenderId: "69382103433",
    appId: "1:69382103433:web:6333ff426feafc34618158",
    measurementId: "G-7T3PT2DK15"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { collection, getDocs, db, addDoc, deleteDoc, doc, updateDoc, onSnapshot };
