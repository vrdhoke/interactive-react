import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ListMovies from './ListMovies'
import ListPeople from './ListPeople'
export default function Roster() {
    return (
      <div>
        <Router>
          <Route exact path='/movie' component={ListMovies}/>
          <Route path='/movie/:title/:date/:number' component={ListPeople}/>
        </Router>
      </div>
    );
  }