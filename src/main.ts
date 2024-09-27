import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import router from './router';

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

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth();
let userFirebase: User | null | undefined = undefined;
onAuthStateChanged(auth, (user) => {
    if (user) {
        userFirebase = user;
        initializeAppWhenAuthenticated();
    } else {
        userFirebase = undefined;
        initializeAppWhenAuthenticated();
    }
});

function initializeAppWhenAuthenticated() {
    const app = createApp(App);
    app.use(router);
    app.mount('#app');
}

setTimeout(() => {
   if (userFirebase === undefined) {
       initializeAppWhenAuthenticated();
   }
}, 5000);

// // Set state persistence
// setPersistence(auth, browserLocalPersistence)
//     .then(() => {
//         // Create and mount the app only after setting persistence
//         const app = createApp(App);
//
//         // Set up an onAuthStateChanged listener
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 // User is signed in
//                 console.log("User is signed in:", user);
//                 // Optional: Navigate to the protected route if not already there
//                 if (router.currentRoute.value.name !== 'register' && router.currentRoute.value.name !== 'notfound') {
//                     router.push('/led-control');
//                 }
//             } else {
//                 // No user is signed in, navigate to login page
//                 console.log("No user is signed in.");
//                 if (router.currentRoute.value.name !== 'login' && router.currentRoute.value.name !== 'notfound') {
//                     router.push('/login');
//                 }
//             }
//         });
//
//         // Use the router and mount the app
//         app.use(router);
//         app.mount('#app');
//     })
//     .catch((error) => {
//         console.error("Error setting persistence:", error.code, error.message);
//         // Mount the app even if setting persistence fails
//         const app = createApp(App);
//         app.use(router);
//         app.mount('#app');
//     });
//
// // Listen for router errors
// router.onError((error) => {
//     console.error('Router error:', error);
// });
