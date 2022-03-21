import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import '../../../css/DetailPage.css'
import MovieDetails from './MovieDetails';


function DetailPage(props){
  const [movieData, _setMovieData] = useState(null);
  const [errorMessage, _setErrorMessage] = useState(null);

  useEffect(() => {
  // Update the document title using the browser API
  if(!movieData){
    console.log('load movie data');
    _loadMovieData(_setMovieData, _setErrorMessage);
  }
  }, [movieData]);

  if(errorMessage) {
    return _renderError(errorMessage);
  } else if(!movieData){
    return _renderLoading(errorMessage);
  }  else {
    return _renderDetail(movieData);
  }
}

function _renderError(errorMessage){
  return (
    <div className="detail page">
      <Header />
      <div className="contentWrapper">
        <div className="content">
          {errorMessage}
        </div>
      </div>
    </div>
  );
}

function _renderLoading(errorMessage){
  return (
    <div className="detail page">
      <Header />
      <div className="contentWrapper">
        <div className="content">
          Loading ...
        </div>
      </div>
    </div>
  );
}

function _renderDetail(movieData){
  console.log(movieData);
  return (
    <div className="detail page">
      <Header />
      <div className="contentWrapper">
        <div className="content">
          <MovieDetails data={movieData} />
        </div>
      </div>
    </div>
  );
}

function _loadMovieData(setMovieData, setError){
  // get the tmdb id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const tmdbId = urlParams.get('tmdbId')
  if(tmdbId){
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=8d29ae0e838848bb5be6fc3f58c8491b`).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }else{
        return response.json()
      }
    }).then(jsonResponse=>{
      setMovieData(jsonResponse)
    }).catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      setError('There has been a problem with getting the Movie details.')
    });
  }else{
    setError('Could Not resolve the movie id.')
  }
}

export default DetailPage;
