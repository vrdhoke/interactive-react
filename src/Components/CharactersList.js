import React, { useState,useEffect } from 'react';
import '../css/Movie.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CharactersList(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [charactersNames, setCharactersNames] = useState([]);
  const filmId = props.match.params.number;
 
  useEffect(() => {
    let nameList=[];
    const fetchData = async() => {
      // This API returns promise which again contains APIs for Characters of the movies
      await fetch(`https://swapi.dev/api/films/${filmId}/`)
       .then(res => res.json())
       .then(
         async(filmCharacterAPIs) => {
           for(var i=0;i<filmCharacterAPIs.characters.length;i++){
             const api = filmCharacterAPIs.characters[i].replace('http:', 'https:')
             const response = await fetch(api);
             const json = await response.json();
             nameList.push(json.name);
           }
           setIsLoaded(true);
           setCharactersNames(nameList);
         },
         (error) => {
           setIsLoaded(true);
           setError(error);
         }
       )
   }
  fetchData();    
  },[filmId])
  


   
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>
        <img  className="loadingGif" src="https://i.pinimg.com/originals/a7/b0/15/a7b015d343ad801ad6da8c242dc6ae06.gif" alt="Loading..."/>
  </div>
  ;
  }
 
  const nextColumnStart = Math.floor(charactersNames.length / 2);
  return (
    <ul>
      <h2 className="heading-text">{props.match.params.title}({props.match.params.date.substring(0, 4)})</h2>

      <h4 className="color-aqua">Characters</h4> 
      
        <div className="row">
        <div className="col-md-6">
            {charactersNames.slice(0,nextColumnStart).map((name,i)=> <div key={i}>{name}<br/></div>)}
        </div>
        <div className="col-md-6">
            {charactersNames.slice(nextColumnStart).map((name,i)=> <div key={i}>{name}<br/></div>)}                
        </div>
    </div>
   
    </ul>
  );
}