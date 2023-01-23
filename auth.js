//Inicializar firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getAuth, signInWithRedirect, onAuthStateChanged, getRedirectResult, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyBjpvMTTvmSEuIppbL67JE_-Au5j6vJWRs",
    authDomain: "gamma-ceci.firebaseapp.com",
    projectId: "gamma-ceci",
    storageBucket: "gamma-ceci.appspot.com",
    messagingSenderId: "248040178437",
    appId: "1:248040178437:web:6f03649e0287fa71042d6c",
    measurementId: "G-9Q1T23R14Z"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

function login() {
    signInWithRedirect(auth, provider)
        .then((result) => {
            console.log("Login success " + result);
        }).catch((error) => {
            console.log("Error in login " + error);
        });
}

function initApp() {
    getRedirectResult(auth)
        .then((result) => {
            console.log("Redirect loging success " + result);
            if(!auth._currentUser){
                login();
            }
        }).catch((error) => {
            console.log("Error getting redirect result " + error)
        });
}

window.onload = function () {
    initApp();
};