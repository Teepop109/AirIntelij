import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiZ2pTD5loOQxJPMyq7J4KUgZnO3inijM",
    authDomain: "projectf-90dae.firebaseapp.com",
    projectId: "projectf-90dae",
    storageBucket: "projectf-90dae.appspot.com",
    messagingSenderId: "104026088978",
    appId: "1:104026088978:web:4aa22c797e333e9dc51acb",
    measurementId: "G-09Q0PFSNSP"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);