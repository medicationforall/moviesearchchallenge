import React from 'react';
import Header from '../../Header';
import '../../../css/SearchPage.css'

import SearchBar from './SearchBar';
import Genres from './Genres';
import Tags from './Tags';
import Rating from './Rating';

function Search(props){
  return (
    <div className="search page">
      <Header />
      <div className="contentWrapper">
        <div className="content">
          <SearchBar />
          <Genres />
          <Tags />
          <Rating />
        </div>
      </div>
    </div>
  );
}

export default Search;
