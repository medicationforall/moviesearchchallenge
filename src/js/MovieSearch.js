import React from 'react';
import '../css/MovieSearch.css'
import Header from './Header';
import Search from './pages/search/SearchPage';
import Results from './pages/Results';
import Detail from './pages/Detail';

function MovieSearch(props){
  const pages = {
    'search':Search,
    'results':Results,
    'detail':Detail
  }

  const SelectedPage = pages['search']


  return (
    <div className="movieSearch">
      <SelectedPage />
    </div>
  );
}

export default MovieSearch;
