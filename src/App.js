import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import ButtonAppBar from './components/ButtonAppBar';
import MovieData from './components/movieData';
import TVData from './components/tvData';
import Button from '@material-ui/core/Button'
import TrendingData from './components/trendingData';

function App() {
  return (
    <HashRouter basename='/'>
      <div className="App">
        <Button component={Link} to='/movie-screen/movies' style={{background: "grey"}}>Go To Movies</Button>
      </div>
      <Switch>
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
    </HashRouter>
  );
}
export default App;