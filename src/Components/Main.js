import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import MoviesList from './MoviesList'
import CharactersList from './CharactersList'
export default function Main() {
    return (
      <div>
        <Router>
          <Route exact path='/interactive-react' component={MoviesList}/>
          <Route path='/interactive-react/:title/:date/:number' component={CharactersList}/>
        </Router>
      </div>
    );
  }