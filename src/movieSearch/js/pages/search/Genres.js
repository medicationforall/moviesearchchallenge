import React from 'react';
import genres from '../../../json/genres.json';
import { Link } from 'react-router-dom';

function Genre(props){
  //console.log(genres)
  const genreList = genres.map(genre=>{
    const link = "results/?genre=" + encodeURI(genre.name);
    return (<Link to={link} key={genre.name} title={genre.count}><div className="card genre">{genre.name}</div></Link>);
  });

  return (
    <section id="genres" className="genres">
      <h2 >Genres</h2>
      {genreList}
    </section>
  );
}

export default Genre;
