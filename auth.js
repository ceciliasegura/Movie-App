//Inicializar firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getAuth, signInWithRedirect, signOut, getRedirectResult, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

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

const userMailP = document.getElementById("user-mail");
const logOutButton = document.getElementById("log-out");

//Creamos el event listener para el boton de desloguear cuando se pulse llame al singout de firebase
logOutButton.addEventListener('click',async (event) =>{

    event.preventDefault();
    await signOut(auth);
    //volvemos a llamar al login para que vuelva a meter su email
    login();
});


//Funcion para hacer login con firebase
function login() {
    //Llamar a la autenticación de faribase con redirect
    signInWithRedirect(auth, provider)
        .then((result) => {
            console.log("Login success " + result);
        }).catch((error) => {
            console.log("Error in login " + error);
        });
}

//Esta funcion comprueba si hay un redirect del login y si es así, hace un console
//En caso de que no exista un user logado llama al login
function initApp() {
    getRedirectResult(auth)
        .then((result) => {
            console.log("Redirect loging success " + result);
            //Si el usuario no existe llama para hacer el login
            if (!auth._currentUser) {
                login();
            }else{
                //Si el usuario está logado ponemos en el p el email del usuario
                userMailP.innerText = auth.currentUser.email;
            }
        }).catch((error) => {
            console.log("Error getting redirect result " + error)
        });
}

//Cuando se carga la pagina se inizializa la autenticación
window.onload = function () {
    initApp();
};