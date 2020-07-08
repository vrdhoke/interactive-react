import React, { useState,useEffect } from 'react';
export default function ListPeople(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [list, setList] = useState([]);
  let id =props.match.params.number;
  var li=[]
  useEffect(async() => {
    await fetch('https://swapi.dev/api/films/'+id+'/')
      .then(res => res.json())
      .then(
        async(result) => {
          setIsLoaded(true);
          setItems(result.characters);
          for(var i=0;i<result.characters.length;i++){
            const response = await fetch(result.characters[i]);
            const json = await response.json();
            li.push(json.name);
          }
          setList(li);
          // videoUrls();
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
  
  const videoUrls = async () => {
    for(var i=0;i<items.length;i++){
      const response = await fetch(items[i]);
      const json = await response.json();
      li.push(json.name);
    }
    setList(li);
   }
   
  return (
    <ul>
      {/* {items.length} */}
      {props.match.params.title}({props.match.params.date.substring(0, 4)})<br/><br/>
      {list.map(item => (
           <div> {item}</div>
          ))}
    </ul>
  );
}