
//cojemos el div donde van a ir los resultados
const divResultsMovies = document.querySelector("#results-movies");
// cojo el input
const inputMovieName = document.querySelector("#search-movie");
//creo la función findMovies para que cada vez que se dé al botón de enviar, se busque
//la pelicula que ha introducido el usuario. 
//se necesita poner el export porque cuando cargamos el script le ponemos de tipo module, para poder meter firebase
function findMovies() {
    // declaramos la variable url que es donde se llama a la api concatenandola con 
    //el valor que ha metido el usuario en el input, y así generamos la url dinamica.
    const url = "https://www.omdbapi.com/?apikey=d2a94d0&type=movie&s=" + inputMovieName.value;

    fetch(url)
        .then((response) => response.json())//parseamos la respuesta a un json
        .then((data) => {
            console.log(data)
            //vamos a cargar las peliculas que nos devuelve la api en el html. hacemos un
            //forEach para recorrer todos los elementos del array que nos devuelve el json 
            data.Search.forEach(element => {
                //creamos un div para meter los atributos de cada pelicula
                const divMovie = document.createElement("div");
                divMovie.className = "movie";
                //creamos una p para mostrar el título de cada pelicula 
                const pMovie = document.createElement("p");
                pMovie.innerText = element.Title;
                //añadimos el p al div de cada pelicula
                divMovie.append(pMovie);
                //creamos una variable imgMovie para añadir la imagen de la pelicula 
                const imgMovie = document.createElement("img");
                imgMovie.src = element.Poster;
                //la añadimos al div de cada pelicula
                divMovie.append(imgMovie);
                //repetimos el proceso con año y view
                const pMovieYear = document.createElement("p");
                pMovieYear.innerText = element.Year;
                divMovie.append(pMovieYear);

                const btnView = document.createElement("a");
                btnView.href = "./movie.html?id=" + element.imdbID;
                btnView.innerText = "view";
                divMovie.append(btnView);
                //añadimos el div de cada pelicula al div global 
                divResultsMovies.append(divMovie)


            });
        });



}