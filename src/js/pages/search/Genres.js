import React from 'react';
import genres from '../../../json/genres.json';

function Genre(props){
  //console.log(genres)
  const genreList = genres.map(genre=>{
    const link = "results/?genre=" + encodeURI(genre.name);
    return (<a href={link} key={genre.name} title={genre.count}><div className="card genre">{genre.name}</div></a>);
  });

  return (
    <section className="genres">
      <h2 id="genres">Genres</h2>
      {genreList}
    </section>
  );
}

export default Genre;
