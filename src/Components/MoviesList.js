import React, { useState,useEffect } from 'react';
import { Link} from 'react-router-dom'
import Movie from './Movie';
import '../css/Movie.css';

export default function MoviesList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movies, setMovies] = useState([]);
    useEffect(() => {
      const fetchMovies = async() => {
        await fetch("https://swapi.dev/api/films/")
          .then(res => res.json())
          .then(
            (filmResponse) => {
              setIsLoaded(true);
              // Sorting Films returned from API in ascending order
              const filmsSortedByReleaseDate = filmResponse.results.sort((film1, film2) =>
               film1.release_date.substring(0, 4) - film2.release_date.substring(0, 4));
               setMovies(filmsSortedByReleaseDate);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }
      fetchMovies();
    },[])
  

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>
        <img className="loadingGif" src="https://i.pinimg.com/originals/a7/b0/15/a7b015d343ad801ad6da8c242dc6ae06.gif" alt="Loading..." /></div>;
    } else {
      return (
        <ul>
          <h3 className="heading-text">MOVIES</h3>
          {movies.map((movie,i) => (
          <div key={i}>
          <h4 ><Link className="movie-text" to={`/interactive-react/${movie.title}/${movie.release_date}/${movie.episode_id}`}><Movie movie={movie}/></Link></h4>
          </div>
          ))}
        </ul>
      );
    }
  }