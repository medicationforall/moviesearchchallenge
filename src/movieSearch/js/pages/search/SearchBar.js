import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../../../core/web/js/button/Search'

function SearchBar(props){
  const [searchTerm, _setSearchTerm] = useState('');
  const navigate = useNavigate();
  return (
    <section id="searchBar">
      <div className="bar">
      <input
        type="text"
        value={searchTerm}
        onChange={e=>_onSearchTermChange(e, _setSearchTerm)}
        onKeyUp={e => {
          //triggers by pressing the enter key
          if (e.keyCode === 13) {
            _searchClick(searchTerm, navigate);
          }
        }}
        autoFocus
        >
      </input>
      <Search className="primary" onClick={e=>_searchClick(searchTerm, navigate)}>Search</Search>
      </div>
    </section>
  );
}

function _onSearchTermChange(e, setSearchTerm){
  const value = e.target.value;
  setSearchTerm(value);
}

function _searchClick(searchTerm, navigate){
  if(searchTerm){
    navigate('/results?search=' + encodeURI(searchTerm));
  }
}

export default SearchBar;
