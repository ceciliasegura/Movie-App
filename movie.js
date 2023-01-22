//Inicializar firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

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

const db = getFirestore();

const pTitle = document.querySelector("#title");
const img = document.querySelector("#img");
const pYear = document.querySelector("#year");
const pDuration = document.querySelector("#duration");
const pDirector = document.querySelector("#director");
const pSinopsis = document.querySelector("#sinopsis");

//Obtenemos el quiery params
const queryParams = window.location.href.slice(window.location.href.indexOf('?') + 1);
const id = queryParams.split("=")[1];
const url = "https://www.omdbapi.com/?apikey=d2a94d0&plot=full&i=" + id;

//Variable para copiar la pelicula que recuperamos de la api
let movie;
fetch(url)
    .then((response) => response.json())//parseamos la respuesta a un json
    .then((data) => {
        movie = data;
        console.log(data);
        pTitle.innerText = data.Title;
        img.src = data.Poster;
        pYear.innerText = data.Year;
        pDuration.innerText = data.Runtime;
        pDirector.innerText = data.Director;
        pSinopsis.innerText = data.Plot;
    });

//Añadimos el listener al boton de favoritos, que cuando se 
//hace click se escribe la movie en firebase por el id de la pelicula
const buttonFavorite = document.getElementById("add-favourite");
buttonFavorite.addEventListener('click', () => {
    const docDatabase = doc(db, 'movies', id)
    setDoc(docDatabase, movie)
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
})
