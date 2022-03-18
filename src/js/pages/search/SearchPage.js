import React from 'react';
import Header from '../../Header';
import '../../../css/SearchPage.css'
import {Link} from "react-router-dom";

import SearchBar from './SearchBar';
import Genres from './Genres';
import Tags from './Tags';
import Rating from './Rating';

function Search(props){
  return (
    <div className="search page">
      <Header>
        <a href="#search">Search</a>
        <a href="#genres">Genres</a>
        <a href="#tags">Tags</a>
        <a href="#rating">Rating</a>
        <Link to="/about">About</Link>
      </Header>
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
