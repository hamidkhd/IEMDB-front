import React from 'react';

function MoviesList(props) {
    let movies = []
    for (let i=0; i<props.movies.length; i++)
        movies.push(Movie(props.movies[i]));
    return movies;
}

export function Movie(props) {
    let url = "/movies/" + props.movie.id;
    return (
        <a href={url}>
            <div className="img-container">
                <img src={props.movie.image} alt={props.movie.name} className="image" />
                <div className="overlay">
                    <div className="text">
                        <dl>
                            <dt dir="rtl"><h1> {props.movie.name} </h1></dt>
                            <dt dir="rtl"> {props.movie.imdbRate}</dt>
                        </dl>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default MoviesList;