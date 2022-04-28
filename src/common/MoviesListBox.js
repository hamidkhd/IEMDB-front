import React from 'react';

function MoviesList(props) {
    let movies = []
    for (let i=0; i<props.movies.length; i++)
        movies.push(Movie(props.movies[i]));
    return movies;
}

export function Movie(movie) {
    let url = "/movies/" + movie.id;
    return (
        <a href={url}>
            <div className="img-container">
                <img src={movie.image} alt={movie.name} className="image" />
                <div className="overlay">
                    <div className="text">
                        <dl>
                            <dt dir="rtl"><h1> {movie.name} </h1></dt>
                            <dt dir="rtl"> {movie.imdbRate}</dt>
                        </dl>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default MoviesList;