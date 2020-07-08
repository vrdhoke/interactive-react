import React, { useState,useEffect } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Movie from './Movie';
import ListPeople from './ListPeople';


export default function Movies() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(async() => {
      await fetch("https://swapi.dev/api/films/")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.results);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          
          {items.map(item => (
            
            <div><Link to={`/movie/${item.title}/${item.release_date}/${item.episode_id}`}>{item.title}</Link><br/></div>
            
          ))}
          
          
        </ul>
      );
    }
  }