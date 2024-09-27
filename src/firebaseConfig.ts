// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBiZ2pTD5loOQxJPMyq7J4KUgZnO3inijM",
    authDomain: "projectf-90dae.firebaseapp.com",
    projectId: "projectf-90dae",
    storageBucket: "projectf-90dae.appspot.com",
    messagingSenderId: "104026088978",
    appId: "1:104026088978:web:4aa22c797e333e9dc51acb",
    measurementId: "G-09Q0PFSNSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Set auth state persistence to local, so the user stays logged in
setPersistence(auth, browserLocalPersistence);

export { auth };
