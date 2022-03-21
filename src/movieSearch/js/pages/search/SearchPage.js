import React from 'react';
import Header from '../../Header';
import '../../../css/SearchPage.css'
import {Link} from "react-router-dom";

import SearchBar from './SearchBar';
import Genres from './Genres';
import Tags from './Tags';

function Search(props){
  return (
    <div className="search page">
      <Header>
        <a href="#searchBar">Search</a>
        <a href="#genres">Genres</a>
        <a href="#tags">Tags</a>
        <Link to="/about">About</Link>
      </Header>
      <div className="contentWrapper">
        <div className="content">
          <SearchBar />
          <Genres />
          <Tags />
        </div>
      </div>
    </div>
  );
}

export default Search;
