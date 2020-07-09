import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ListMovies from './ListMovies'
import ListPeople from './ListPeople'
export default function Roster() {
    return (
      <div>
        <Router>
          <Route exact path='/interactive-react' component={ListMovies}/>
          <Route path='/interactive-react/:title/:date/:number' component={ListPeople}/>
        </Router>
      </div>
    );
  }