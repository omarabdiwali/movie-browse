import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ButtonAppBar from './components/ButtonAppBar';
import MovieData from './components/movieData';
import TVData from './components/tvData';
import Button from '@material-ui/core/Button'
import TrendingData from './components/trendingData';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <ButtonAppBar type={<MovieData />} kind={ "Movies" } />
        </Route>
        <Route path='/movies'>
          <ButtonAppBar type={<MovieData />} kind={ "Movies" } />
        </Route>
        <Route path='/tvshows'>
          <ButtonAppBar type={ <TVData /> } kind={ "TV Shows" } />
        </Route>
        <Route path='/trending'>
          <ButtonAppBar type={ <TrendingData /> } kind={ "Trending" } />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
