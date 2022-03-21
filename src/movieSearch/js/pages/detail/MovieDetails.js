import React from 'react';

function MovieDetails({data}){
  console.log('movie details', data);
  return (
    <div className="movieDetails">
      <div className="title">
        <h2>{data.title}</h2>
      </div>
      <div className="rating">
        Popularity: {data.popularity}
      </div>
      <div className="overview">
        {data.overview}
      </div>

      <div className="homepage">
        <a href="https://game-icons.net/1x1/delapouite/film-projector.html" target="_blank" rel="noopener noreferrer">{data.homepage}</a>
      </div>

    </div>
  );
}

export default MovieDetails;
