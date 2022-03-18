import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import '../css/MovieSearch.css'
import Header from './Header';
import Search from './pages/search/SearchPage';
import Results from './pages/results/Results';
import Detail from './pages/Detail';
import About from './pages/About';

function MovieSearch(props){
  return (
    <div className="movieSearch">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="results" element={<Results />} />
          <Route path="detail" element={<Detail />} />
          <Route path="about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MovieSearch;
