import React, { useState } from 'react';
import Header from '../../Header'
import movies from '../../../json/movies.json';
import resultTabs from '../../../json/resultTabs.json';
import Tabs from '../../../../core/web/js/tab/Tabs';
import List from './List';
import Table from './Table';
import '../../../css/Results.css'

function Results(props){
  const [selectedTab, _setSelectedTab] = useState('list');
  const tabMap = {'list':List, 'table': Table};
  const ResultContent = tabMap[selectedTab];
  let movieResults = _resolveMovies(movies);

  return (
    <div className="results page">
      <Header />
      <div className="contentWrapper">
        <div className="content">
          Results
          <Tabs
            selected={selectedTab}
            list={resultTabs}
            clickHandler={tab=>_setSelectedTab(tab)}
          />
          <ResultContent movies={movieResults} />
        </div>
      </div>
    </div>
  );
}

function _resolveMovies(movies){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const genre = urlParams.get('genre');
  const tags = urlParams.getAll('tag[]');
  const inTags = urlParams.getAll('intag[]');
  const exTags = urlParams.getAll('extag[]');
  const search = urlParams.get('search');
  const ratingEQ = parseFloat(urlParams.get('rating'));
  const ratingLT = parseFloat(urlParams.get('ratinglt'));
  const ratingGT = parseFloat(urlParams.get('ratinggt'));

  let movieTitle = Object.keys(movies);
  movieTitle = movieTitle.sort();
  movieTitle = _filterByGenre(genre, movieTitle);

  movieTitle = _filterByInclusiveTags(inTags, movieTitle);
  movieTitle = _filterByRequiredTags(tags, movieTitle);
  movieTitle = _filterByExcludeTags(exTags, movieTitle);

  movieTitle = _filterByRatingGT(ratingGT, movieTitle);
  movieTitle = _filterByRatingLT(ratingLT, movieTitle);
  movieTitle = _filterByRating(ratingEQ, movieTitle);

  movieTitle = _filterTitleBySearch(search, movieTitle);

  const movieArray = movieTitle.map(title=>{
    let movie = movies[title];
    movie['title'] = title
    return movie;
  });

  return movieArray;
}


function _filterByGenre(genre, movieTitle){
  if(genre){
    console.log('_filterByGenre', genre);
    movieTitle = movieTitle.filter(title=>{
      const movie = movies[title];
      return movie.genres.includes(genre);
    });
  }
  return movieTitle;
}


function _filterByInclusiveTags(inTags, movieTitle){
  if(inTags.length > 0){
    console.log('_filterByInclusiveTags', inTags);
    movieTitle = movieTitle.filter(title=>{
      const movie = movies[title];

      if(movie.tags && movie.tags.length >0){
        let tagPass = false;
        inTags.forEach( tag =>{
          if(movie.tags.includes(tag) === true){
            tagPass = true;
          }
        });
        return tagPass;
      } else{
        return false;
      }
    });
  }
  return movieTitle;
}


function _filterByRequiredTags(tags, movieTitle){
  if(tags.length > 0){
    console.log('_filterByRequiredTags', tags);
    movieTitle = movieTitle.filter(title=>{
      const movie = movies[title];

      if(movie.tags && movie.tags.length >0){
        let tagPass = true;
        tags.every( tag =>{
          if(movie.tags.includes(tag) === false){
            tagPass = false;
          }
          return tagPass;
        });
        return tagPass;
      } else{
        return false;
      }
    });
  }
  return movieTitle;
}


function _filterByExcludeTags(exTags, movieTitle){
  if(exTags.length > 0){
    console.log('_filterByExcludeTags', exTags);
    movieTitle = movieTitle.filter(title=>{
      const movie = movies[title];

      if(movie.tags && movie.tags.length >0){
        let tagPass = true;
        exTags.every( tag =>{
          if(movie.tags.includes(tag) === true){
            tagPass = false;
          }
          return tagPass;
        });
        return tagPass;
      }else{
        return true;
      }
    });
  }
  return movieTitle;
}

function _filterByRatingGT(ratingGT, movieTitle){
  if(ratingGT){
    console.log('_filterByRatingGT', ratingGT);
    movieTitle = movieTitle.filter(title=>{
      const movie = movies[title];
      return parseFloat(movie.rating) > ratingGT;
    });
  }
  return movieTitle;
}

function _filterByRatingLT(ratingLT, movieTitle){
  if(ratingLT){
    console.log('_filterByRatingLT', ratingLT);
    movieTitle = movieTitle.filter(title=>{
      const movie = movies[title];
      return parseFloat(movie.rating) < ratingLT;
    });
  }
  return movieTitle;
}

function _filterByRating(ratingEQ, movieTitle){
  if(ratingEQ){
    console.log('_filterByRating', ratingEQ);
    movieTitle = movieTitle.filter(title=>{
      const movie = movies[title];
      return parseFloat(movie.rating) === ratingEQ;
    });
  }
  return movieTitle;
}


function _filterTitleBySearch(search, movieTitle){
  if(search){
    console.log('_filterTitleBySearch', search);
    movieTitle = movieTitle.filter(title=>{
      return title.toLowerCase().includes(search.toLowerCase());
    });
  }
  return movieTitle;
}

export default Results;
