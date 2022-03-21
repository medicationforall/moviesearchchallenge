import React from 'react';
import Header from '../Header';
import '../../css/About.css'

function About(props){
  return (
    <div className="about page">
      <Header />
      <div className="contentWrapper">
        <div className="content">
          <h2>About</h2>
          <ul>
          <li>Written By: James Adams</li>
          <li>Logo Image: <a href="https://game-icons.net/1x1/delapouite/film-projector.html" target="_blank" rel="noopener noreferrer">Game-icons.net</a></li>
          <li>Test Data set: <a href="https://grouplens.org/datasets/movielens/latest/" target="_blank" rel="noopener noreferrer">Small dataset</a></li>
          <li>Movie Details: <a href="https://www.themoviedb.org/?language=en-US" target="_blank" rel="noopener noreferrer">TMDB</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
