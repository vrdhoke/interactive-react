import React, { useState,useEffect } from 'react';
import '../css/Movie.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListPeople(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  var filmId = props.match.params.number;
 
  useEffect(() => {
    let id = filmId;
    var li=[];
    var fetchData= async() => {
      await fetch('https://swapi.dev/api/films/'+id+'/')
       .then(res => res.json())
       .then(
         async(result) => {
           for(var i=0;i<result.characters.length;i++){
             const link = result.characters[i].replace('http:', 'https:')
             const response = await fetch(link);
             const json = await response.json();
             li.push(json.name);
           }
           setIsLoaded(true);
           setItems(li);
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
        <img src="https://i.pinimg.com/originals/a7/b0/15/a7b015d343ad801ad6da8c242dc6ae06.gif" alt="Loading..."/>
  </div>
  ;
  }

  const secondColumnStart = Math.floor(items.length / 2);
  return (
    <ul>
      <h2 className="ColorM">{props.match.params.title}({props.match.params.date.substring(0, 4)})</h2>

      <h4 className="ColorTxt">Characters</h4> 
        <div className="row">
        <div className="col-md-6">
            {items.slice(0,secondColumnStart).map((item,i)=> <div key={i}>{item}<br/></div>)}
        </div>
        <div className="col-md-6">
            {items.slice(secondColumnStart).map((item,i)=> <div key={i}>{item}<br/></div>)}                
        </div>
    </div>
   
    </ul>
  );
}