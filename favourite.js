import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getFirestore, getDocs, collection, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyBjpvMTTvmSEuIppbL67JE_-Au5j6vJWRs",
    authDomain: "gamma-ceci.firebaseapp.com",
    projectId: "gamma-ceci",
    storageBucket: "gamma-ceci.appspot.com",
    messagingSenderId: "248040178437",
    appId: "1:248040178437:web:6f03649e0287fa71042d6c",
    measurementId: "G-9Q1T23R14Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const movies = getDocs(collection(db, "movies"));

const divResultsMovies = document.querySelector("#results-movies");

movies
    .then(data =>
        data.forEach(element => {
            //creamos un div para meter los atributos de cada pelicula
            const divMovie = document.createElement("div");
            divMovie.className = "movie";
            //creamos una p para mostrar el título de cada pelicula 
            const pMovie = document.createElement("p");
            pMovie.innerText = element.data().Title;
            //añadimos el p al div de cada pelicula
            divMovie.append(pMovie);
            //creamos una variable imgMovie para añadir la imagen de la pelicula 
            const imgMovie = document.createElement("img");
            imgMovie.src = element.data().Poster;
            //la añadimos al div de cada pelicula
            divMovie.append(imgMovie);
            //repetimos el proceso con año y view
            const pMovieYear = document.createElement("p");
            pMovieYear.innerText = element.data().Year;
            divMovie.append(pMovieYear);

            const btnView = document.createElement("a");
            btnView.href = "./movie.html?id=" + element.data().imdbID;
            btnView.innerText = "view";
            divMovie.append(btnView);

            const btnDelete = document.createElement("button");
            btnDelete.innerText = "Delete";
            btnDelete.addEventListener("click", event => {
                event.preventDefault();
                deleteFavourite(divMovie, element.data().imdbID)
            });
            divMovie.append(btnDelete);

            //añadimos el div de cada pelicula al div global 
            divResultsMovies.append(divMovie)


        })
    );

function deleteFavourite(divMovie, id) {
    console.log("Remove: " + id);
    deleteDoc(doc(db, "movies", id))
        .then(() => {
            console.log("Document removed");
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });

    divResultsMovies.removeChild(divMovie);
}