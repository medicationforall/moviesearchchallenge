import React from 'react';
import { Link } from 'react-router-dom';

function List({movies}){
  const moviesList = movies.map(movie=>{
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
    <ul>
      {moviesList}
    </ul>
  );
}

export default List;
