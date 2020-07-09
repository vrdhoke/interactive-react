import React, { useState,useEffect } from 'react';
import { Link} from 'react-router-dom'
import Movie from './Movie';
import '../css/Movie.css';

export default function Movies() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
      var fetchMovies = async() => {
        await fetch("https://swapi.dev/api/films/")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              var temp;
              for (var i = 0; i < result.results.length; i++) 
              {
              for (var j = i + 1; j < result.results.length; j++) { 
                  if (result.results[i].release_date.substring(0, 4) > result.results[j].release_date.substring(0, 4)) 
                  {
                      temp = result.results[i];
                      result.results[i] = result.results[j];
                      result.results[j] = temp;
                  }
                }
              }
              setItems(result.results);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }
      fetchMovies();
    },[])
  
    // var fetchMovies = async() => {
    //   await fetch("https://swapi.dev/api/films/")
    //     .then(res => res.json())
    //     .then(
    //       (result) => {
    //         setIsLoaded(true);
    //         var temp;
    //         for (var i = 0; i < result.results.length; i++) 
    //         {
    //         for (var j = i + 1; j < result.results.length; j++) { 
    //             if (result.results[i].release_date.substring(0, 4) > result.results[j].release_date.substring(0, 4)) 
    //             {
    //                 temp = result.results[i];
    //                 result.results[i] = result.results[j];
    //                 result.results[j] = temp;
    //             }
    //           }
    //         }
    //         setItems(result.results);
    //       },
    //       (error) => {
    //         setIsLoaded(true);
    //         setError(error);
    //       }
    //     )
    // }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>
        <img src="https://i.pinimg.com/originals/a7/b0/15/a7b015d343ad801ad6da8c242dc6ae06.gif" alt="Loading..." /></div>;
    } else {
      return (
        <ul>
          <h3 className="ColorM">MOVIES</h3>
          {items.map((item,i) => (
          <div key={i}>
          <h4 ><Link className="MText" to={`/movie/${item.title}/${item.release_date}/${item.episode_id}`}><Movie movie={item}/></Link></h4>
          </div>
          ))}
        </ul>
      );
    }
  }