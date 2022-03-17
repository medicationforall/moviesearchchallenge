import React from 'react';
import genres from '../../../json/genres.json';

function Genre(props){
  console.log(genres)

  const genreList = genres.map(genre=>{
    const link = "results/?genre=" + genre.name;
    return (<a href={link} key={genre.name} ><div className="card genre">{genre.name}<br />{genre.count}</div></a>);
  });

  return (
    <section className="genres">
      <h2>Genres</h2>
      {genreList}
    </section>
  );
}

export default Genre;
