import React from 'react';
import "./showDetails.css";

export default function ShowDetails({data, type=null}) {

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function genres() {
    let l = [];
    data.genres.map((genre) => {
      return l.push(genre.name);
    })

    let list = l.join(', ');
    return list
  }

  function seasons() {
    let l = [];
    data.seasons.map((season, i) => {
      i = i + 1;
      let ep = i + `(${season.episode_count})`;
      return l.push(ep)
    })

    let total = l.join(", ");
    return total;
  }

  function movieLength() {
    let time = data.runtime;
    let h = Math.floor(time / 60);
    let m = time - (h * 60);

    time = `${h}h ${m}m`;

    return time; 
  }

  function year() {
    if (type) return data.first_air_date.substr(0, 4);
    else return data.release_date.substr(0, 4)
  }
  
  return (
    <div style={{ color: "white" }}>
      <section style={{marginTop: "10px", display: "flex", flexDirection: "row"}}>
        <img style={{ border: "white", autoResize: "auto 342 / 513" }} src={data.poster_path ? `http://image.tmdb.org/t/p/w342${data.poster_path}` : "https://media.comicbook.com/files/img/default-movie.png"} alt={data.title}></img>
        <div style={{width: "50%", margin: "0 auto"}}>
          <h1 style={{ fontSize: "30px" }}>{type ? data.name : data.title}</h1>
          <div className={"details"}>
            <p>{data.overview}</p>
            <p>Year Released : { year() }</p>
            <p>{ type ? `Seasons: ${seasons()}` : "" }</p>
            <p>Rating: { data.vote_average + `/10 (${data.vote_count})` }</p>
            <p>{ data.budget > 0 ? `Budget: $${numberWithCommas(data.budget)}` : "" }</p>
            <p>Type: {type ? "TV Show" : "Movie"}</p>
            <p>{ !type ? `Length: ${movieLength()}` : "" }</p>
            <p>Homepage: <a target={"_blank"} href={data.homepage} rel="noopener noreferrer" style={{ color: "white" }}>{data.homepage}</a></p>
            <p>Genres: { genres() }</p>
          </div>
        </div>
      </section>
    </div>
  )
}