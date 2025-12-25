import React, { useState } from 'react';
import {useEffect} from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MoviesCard';


const API_URL = 'http://www.omdbapi.com/?apikey=9190bd20';

const movie = {
    "Title": "Discount Spiderman 2",
    "Year": "2018",
    "imdbID": "tt9146610",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BY2U4NjY2YTQtZDFiYS00YTk2LTk5NDItMWVlNmIwZjYyZmE5XkEyXkFqcGc@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    console.log(Array.isArray(movies), movies);


    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        console.log(data.Search);
        setMovies(data.Search || []);
        
    }

    useEffect(()=>{
     searchMovies('Spiderman');
    },[])


    return (
        <div className = 'app'>
            <h1> MovieLand</h1>
            <div className = "search"> 
                <input
                 placeholder='Search for Movies'
                 value = {searchTerm}
                 onChange ={(e) =>setSearchTerm(e.target.value)}
                />
                <img 
                src = {SearchIcon}
                alt = "search"
                onClick={() =>searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0 ?
                (
                <div className = "container">
              {/* <MovieCard movie={movies[0]}/> */}
              {movies.map((movie)=>(
                <MovieCard movie = {movie} />
              ))}
               </div>

                ) : (<div>
                    <h2>No Movioes Found</h2>
                    </div>
                    )
            }

       


        </div>
    );
}

export default App;