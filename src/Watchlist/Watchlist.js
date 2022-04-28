import React from 'react';
import {useState, useEffect} from "react";
import './Watchlist.css';
import {getMovieActors} from "../Services/Movie";
import {deleteFromWatchList, getRecommendedMovies, getWatchList} from "../Services/Watchlist";
import LoadingSpinner from "../common/LoadingSpinner";

function Watchlist(props) {
    const [recommendedMovies, setRecommendedMovies] = useState({});
    const [loading, setLoading] = useState(true);
    const showRecommendedMovies = () => {
        console.log('update');
        setLoading(true);
        getRecommendedMovies()
            .then(res => {
                console.log(res);
                setRecommendedMovies(res);
                setLoading(false);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            });
    }
    useEffect( () => {
        showRecommendedMovies();
    },[]);

    return (
        <div className="container">
            <WatchlistMovies updateRecommended={showRecommendedMovies}/>
            {loading? (<LoadingSpinner />) : (
                <RecommendedMovies movies={recommendedMovies}/> )
            }
        </div>
    );

}

function WatchlistMovies(props) {
    const [movies, setMovies] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect( () => {
        setLoading(true);
        getWatchList()
            .then(res => {
                setMovies(res);
                setLoading(false);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            });
    },[]);
    if(loading)
        return null;
    let movieItems = [];
    for (let i=0; i<movies.length; i++)
        movieItems.push(MovieItem(movies[i], setMovies, props.updateRecommended));
    return movieItems;

}

function MovieItem(movie, setMovies, updateRecommended) {
    const url = "movies/" + movie.id;
    const handleDeleteClick = ()  => {
        deleteFromWatchList(movie.id)
            .then(res => {
                setMovies(res);
                updateRecommended();
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            });
    }

    return (
        <div className="movie-desc">
            <div className="movie-desc-img-container">
                <div className="new-col">
                    <a href={url}>
                        <img src={movie.image} alt={movie.name} />
                    </a>
                </div>
                <div className="new-col">
                    <dl className="desc" onClick={handleDeleteClick}>
                        <dt dir="rtl"> {movie.name}</dt>
                        <span className="iconify custom-icon" data-icon="ei:trash"></span>
                    </dl>
                </div>
                <div className="new-col">
                    <dl className="desc">
                        <dt dir="rtl"> {movie.imdbRate}:IMDB امتیاز</dt>
                        <dt dir="rtl"> امتیاز کاربران: {movie.rating}</dt>
                    </dl>
                </div>
                <div className="new-col">
                    <dl className="desc">
                        <dt dir="rtl"> کارگردان: {movie.director}</dt>
                        <dt dir="rtl"> ژانر: {movie.genres.join(", ")}</dt>
                        <dt dir="rtl"> تاریخ انتشار: {movie.releaseDate}</dt>
                        <dt dir="rtl"> مدت زمان: {movie.duration} دقیقه</dt>
                    </dl>
                </div>
            </div>
        </div>
    );
}

function RecommendedMovies(props) {
    if (props.movies.length == 0)
        return;
    let recommendedMovies = [];
    for(let i=0; i<props.movies.length;i++)
        recommendedMovies.push(RecommendedMovieItem(props.movies[i]));
    return (
        <div className="movie-rec">
            <div className="text"> فیلم های پیشنهادی</div>
            <div className="images-list">
                {recommendedMovies}
            </div>
        </div>
    );
}

function RecommendedMovieItem(movie) {
    const url = "/movies/" + movie.id;
    return (
        <a href={url}>
            <div className="movie-rec-img-container">
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

export default Watchlist;