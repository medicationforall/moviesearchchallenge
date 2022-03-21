import React from 'react';
import ReactDOM from 'react-dom';
import './core/web/css/variables.css';
import './core/web/css/base.css';
import MovieSearch from './movieSearch/js/MovieSearch';

ReactDOM.render(
  <React.StrictMode>
    <MovieSearch />
  </React.StrictMode>,
  document.getElementById('root')
);
