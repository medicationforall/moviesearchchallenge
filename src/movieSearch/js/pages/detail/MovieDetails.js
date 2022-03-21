import React from 'react';

function MovieDetails({data}){
  const posterAltText = data.title;
  const posterPath = `https://image.tmdb.org/t/p/w342/${data.poster_path}`;
  const homePage = _renderHomePage(data);
  const budget = _renderCurrency('Budget', data.budget);
  const revenue = _renderCurrency('Revenue', data.revenue);
  const releaseDate = _renderReleaseDate(data);

  return (
    <div className="movieDetails">

      <section className="title">
        <h2>{data.title}</h2>
      </section>
      <div className="grid">
        <div>
          <section className="poster">
            <img src={posterPath} alt={posterAltText} />
          </section>
        </div>

        <div>
          <section className="tagline">
            {data.tagline}
          </section>


          <section className="overview">
            {data.overview}
          </section>

          <section className="detailGrid">
            {releaseDate}
            {budget}
            {revenue}
          </section>

          {homePage}

          <section className="rating">
            Popularity: {data.popularity}
          </section>
        </div>
      </div>

    </div>
  );
}

function _renderHomePage(data){
  if(data.homepage){
    return (
      <section className="homepage">
        Homepage: <a href={data.homepage} target="_blank" rel="noopener noreferrer">{data.homepage}</a>
      </section>
    );
  }else{
    return null;
  }
}

function _renderCurrency(label, amount){
  if(amount){
    const amountString = amount.toLocaleString(undefined, {
      style: "currency",
      currency: "USD"
    });
    return (
      <>
        <span>{label}:</span> <span>{amountString}</span>
      </>
    );
  }else{
    return null;
  }
}


function _renderReleaseDate(data){
  if(data.release_date){
    const releaseDate = new Date(data.release_date);
    const releaseDateString = releaseDate.toLocaleDateString();
    return (
      <>
        <span>Release:</span> <span>{releaseDateString}</span>
      </>
    );
  }else{
    return null;
  }
}

export default MovieDetails;
