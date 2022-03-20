import React from 'react';
import Header from '../../Header'
import movies from '../../../json/movies.json';
import { Link } from 'react-router-dom';

function Results(props){
  let movieResults = _resolveMovies(movies);
  //movieResults = movieResults.slice(0,100);

  const moviesList = movieResults.map(movie=>{
    const link = "/detail?tmdbId="+movie.tmdbId;
    return (
      <li key={movie.title}>
        <Link to={link}>
          {movie.title}
        </Link>
      </li>
    );
  });
  return (
    <div className="results page">
      <Header />
      <div className="contentWrapper">
        <div className="content">
          Results
          <ul>
            {moviesList}
          </ul>
        </div>
      </div>
    </div>
  );
}

function _resolveMovies(movies){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const genre = urlParams.get('genre')
  const tags = urlParams.getAll('tag[]')
  const inTags = urlParams.getAll('intag[]')
  const exTags = urlParams.getAll('extag[]')
  const search = urlParams.get('search')

  let movieTitle = Object.keys(movies);
  movieTitle = movieTitle.sort();
  movieTitle = _filterByGenre(genre, movieTitle);
  movieTitle = _filterByInclusiveTags(inTags, movieTitle);
  movieTitle = _filterByRequiredTags(tags, movieTitle);
  movieTitle = _filterByExcludeTags(exTags, movieTitle);
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
