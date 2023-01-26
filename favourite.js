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

//En vez de optener las peliculas como antes de la api, aquí las optenemos de firebase, 
//en este caso de podría optener del localstrorage tambien por ejemplo
const movies = getDocs(collection(db, "movies"));

const divResultsMovies = document.querySelector("#results-movies");

movies
    .then(data =>{
        //Si existen películas guardadas, quitamos el element p de no hay favoritos, sobreescribiendo el div
        if (data.size > 0) {
            divResultsMovies.innerText = "";
        }

        data.forEach(element => {
            console.log("element:", element.data())
            //creamos un div para meter los atributos de cada pelicula
            const divMovie = document.createElement("div");
            divMovie.className = "movie";
            //creamos una p para mostrar el título de cada pelicula 
            const pMovie = document.createElement("p");
            pMovie.innerText = element.data().Title;
            console.log("element data:", element.data().Title);
            divMovie.append(pMovie);
            //añadimos el p al div de cada pelicula
            // divMovie.append(pMovie);
            //creamos una variable imgMovie para añadir la imagen de la pelicula 
            const imgMovie = document.createElement("img");
            imgMovie.src = element.data().Poster;
            //la añadimos al div de cada pelicula
            divMovie.append(imgMovie);
            //repetimos el proceso con año y view
            const pMovieYear = document.createElement("p");
            pMovieYear.innerText = element.data().Year;
            divMovie.append(pMovieYear);

            //Boton para redirigir a la vista de la info de la película, pasando el query param con el id
            const btnView = document.createElement("a");
            btnView.className = "button-vi"
            btnView.href = "./movie.html?id=" + element.data().imdbID;
            btnView.innerText = "view";
            // divMovie.append(btnView);

            //Añadimos el botón de eliminar de favoritos
            const btnDelete = document.createElement("button");
            btnDelete.className = "btnDelete"
            btnDelete.innerText = "Delete";
            btnDelete.addEventListener("click", event => {
                event.preventDefault();
                //Cuando se clica el botón de eliminar favorito llama a la funcion de deleteFavourite
                deleteFavourite(divMovie, element.data().imdbID)


            });

            let divBtn = document.createElement("div");
            divBtn.classList.add("divBtn");
            divBtn.append(btnView, btnDelete)

            divMovie.append(imgMovie, divBtn);

            //añadimos el div de cada pelicula al div global 
            divResultsMovies.append(divMovie)


        })
    } );

//Esta funcion elimina el favorito de firebase y lo quita de la lista
function deleteFavourite(divMovie, id) {
    console.log("Remove: " + id);
    //Elimna la pelicula de firebase, si estuviera guardado en localstorage lo borraríamos aquí
    deleteDoc(doc(db, "movies", id))
        .then(() => {
            console.log("Document removed");
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });

    //Elimina la pelicula de la lista
    divResultsMovies.removeChild(divMovie);

    //Si no hay favoritos, porque se han eliminado todos ponemos el p como que no se han encontrado
    if (divResultsMovies.childElementCount == 0) {
        divResultsMovies.innerHTML = '<p style="color: white;">No se han encontrado favoritos</p>'
    }
}