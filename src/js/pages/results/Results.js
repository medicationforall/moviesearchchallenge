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
  const tags = urlParams.getAll('tag[]')
  const search = urlParams.get('search')

  let movieTitle = Object.keys(movies);
  movieTitle = movieTitle.sort();

  if(genre){
      movieTitle = movieTitle.filter(title=>{
        let movie = movies[title];
        return movie.genres.includes(genre);
      });
  }

  if(tags.length > 0){
    console.log('filter by tags', tags);
    //movieTitle = movieTitle.filter(title=>{
    //  let movie = movies[title];
    //  return movie.genres.includes(genre);
    //});
  }

  if(search){
    movieTitle = movieTitle.filter(title=>{
      return title.toLowerCase().includes(search.toLowerCase());
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
