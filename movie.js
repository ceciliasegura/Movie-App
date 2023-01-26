//Inicializar firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getFirestore, getDocs, collection, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

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
//sacamos el valor del query param 
const id = queryParams.split("=")[1];
const url = "https://www.omdbapi.com/?apikey=d2a94d0&plot=full&i=" + id;

//Obtenemos las peliculas de firestore, para que no deje cargar las que ya tenemos en favoritos
//Hacemos await para esperar por la respuesta y no tener que hacer el then, de esta manera la promesa se reseulve y devuelve el resultado
const moviesInDb = await getDocs(collection(db, "movies"));

//Variable para copiar la pelicula que recuperamos de la api
let movie;
//Lamamos para recuperar la información de la película a la api
fetch(url)
    .then((response) => response.json())//parseamos la respuesta a un json
    .then((data) => {
        //Guardamos en la variable global los datos de la película 
        //para despues poder guardarlos si se da al botón de añadir a favoritos
        movie = data;
        console.log(data);
        //Añadimos el titulo al p del titulo
        pTitle.innerText = data.Title;
        //Añadimos la imagen y demás atributos
        img.src = data.Poster;
        pYear.innerText = data.Year;
        pDuration.innerText = data.Runtime;
        pDirector.innerText = data.Director;
        pSinopsis.innerText = data.Plot;


        let arrayFav = [];
        
        const buttonFavorite = document.getElementById("add-favourite");

        //Si encontramos la pelicula guardada en firestore, 
        //dehabilitamos el botón de añadir a favoritos
        if (movieInFav(data)) {
            disableButtonToAddFav(buttonFavorite);
        } else {
            //Añadimos el listener al boton de favoritos, que cuando se
            //hace click se escribe la movie en firebase por el id de la pelicula
            buttonFavorite.addEventListener('click', () => {
                if (!arrayFav.find((e) => e.imdbID == data.imdbID)) {
                    arrayFav.push(data)
                    //Creamos el doc, la película, en firebase, que luego guardaremos
                    //Si quisieramos  guardarlo en el local storage habría que cambiarlo aquí
                    const docDatabase = doc(db, 'movies', id)
                    //Guardamos en firebase la película
                    setDoc(docDatabase, movie)
                        .then(() => {
                            console.log("Document successfully written!");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });

                    disableButtonToAddFav(buttonFavorite);
                }
            })
        }
    });

function movieInFav(data) {
    //Nos recorremos con el for each la lista de peliculas guardadas, si existe ponemos la variable found a true
    //si no existe se recorre entera y llega al final de la lista y devuelve el found que se inicializó a false
    let found = false;
    moviesInDb.forEach(e => {
        if (e.data().imdbID == data.imdbID) {
            found = true;
        }
    })
    return found;
}

function disableButtonToAddFav(buttonFavorite) {
    buttonFavorite.innerText = "Already exists in favorites";
    buttonFavorite.style.backgroundColor = "blueviolet";
    buttonFavorite.style.color = "white";
    buttonFavorite.disabled = true;
}

