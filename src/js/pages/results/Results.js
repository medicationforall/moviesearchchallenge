import React from 'react';
import Header from '../../Header'
import movies from '../../../json/movies.json';

function Results(props){
  let movieResults = _resolveMovies(movies);
  movieResults = movieResults.slice(0,100);

  const moviesList = movieResults.map(movie=>{
    const link = "/detail?tmdbId="+movie.tmdbId;
    return (
      <li key={movie.title}>
        <a href={link}>
          {movie.title}
        </a>
      </li>
    );
  });
  return (
    <div className="results page">
      <Header />
      <div className="contentWrapper">
        <div className="content">
          Results page
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
  console.log(genre);

  let movieTitle = Object.keys(movies);
  movieTitle = movieTitle.sort();

  if(genre){
      movieTitle = movieTitle.filter(title=>{
        let movie = movies[title];
        return movie.genres.includes(genre);
      });
  }

  const movieArray = movieTitle.map(title=>{
    let movie = movies[title];
    movie['title'] = title
    return movie;
  });

  return movieArray;
}

export default Results;
