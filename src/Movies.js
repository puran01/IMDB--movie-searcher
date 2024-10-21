import React, { useEffect, useState } from "react";
import './Movies.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

//499b6bcb


 const movie1 = {
    Poster:"https://m.media-amazon.com/images/M/MV5BMjk3ODhmNjgtZjllOC00ZWZjLTkwYzQtNzc1Y2ZhMjY2ODE0XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
    Title: "Superman/Batman: Apocalypse",
    Type: "movie",
    Year: "2010",
    imdbID: "tt1673430"}


const API_URL = 'http://www.omdbapi.com/?apikey=499b6bcb';
function Movies(){

    const [movies, setMovies] = useState([]);
    const [searchTerm, SetSearchTerm] = useState('');

    const searchMovies = async (title) =>{
        try{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
        console.log(data);
        } catch(Err){
        console.error(Err);
    }
    }

    useEffect(() => {
            searchMovies();
        },[]);
    
    return(
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input placeholder="Search for movies" 
                value={searchTerm}
                onChange={(e)=>SetSearchTerm(e.target.value) }                 
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={()=>{ searchMovies(searchTerm)}}
                />
            </div>

            {
                movies?.length > 0 
                    ?
                    (<div className="container">

                        {movies.map((movie)=>(
                            <MovieCard movie={movie}/>
                        ))}

                    </div>
                    ) : ( 
                    <div className="empty">
                    <h2>No Movies Found</h2>
                    </div>)
            }


          

        </div>
    )
}

export default Movies;