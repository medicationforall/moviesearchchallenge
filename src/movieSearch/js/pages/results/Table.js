import React from 'react';
import { Link } from 'react-router-dom';
import DynamicTable from '../../../../core/web/js/table/DynamicTable';
import columns from '../../../json/resultsTableColumns.json';

function Table({movies}){
  console.log(movies);
  const renderer = {
    title: _renderTitleLink,
    tags: _renderTags,
    genres: _renderGenres
  }
  return(
    <div>
      <DynamicTable
        columns={columns}
        rows={movies}
        render={renderer}
      />
    </div>
  );
}

function _renderTitleLink(data, row){
  const link = "/detail?tmdbId="+row.tmdbId;
  return (
    <Link to={link}>{data}</Link>
  );
}

function _renderTags(data){
  if(data){
    const uniqueTags = data.filter(_onlyUnique);
    const tagLinks = uniqueTags.map(tag=>{
      const link = `/results?tag[]=${tag}`;
      return (
        <a key={tag} href={link}>{tag}</a>
      );
    });
    return (
      <div className="tags">
        {tagLinks}
      </div>
    );
  }else{
    return "";
  }
}

function _renderGenres(data){
  if(data){
    const genres =  data.split('|');
    const genreLinks = genres.map(genre=>{
      const link = `/results?genre=${genre}`;
      return (
        <a key={genre} href={link}>{genre}</a>
      );
    });
    return (
      <div className="genres">
        {genreLinks}
      </div>
    );
  }else{
    return "";
  }
}

function _onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default Table;
