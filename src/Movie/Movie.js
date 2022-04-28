import React from 'react';
import './Movie.css';
import {useState, useEffect} from "react";
import {getMovie, postRate} from "../Services/Movie";
import { useParams } from 'react-router-dom';
import {updateWatchList} from "../Services/Watchlist";
import LoadingSpinner from "../common/LoadingSpinner";
import {toast} from "react-toastify";
import ActorsBox from "./ActorsBox";
import CommentsBox from "./CommentsBox";

function Movie(props) {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect( () => {
        setLoading(true);
        getMovie(movieId)
            .then(m => {
                setMovie(m);
                setComments(m.comments);
                setLoading(false);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            });
        },[]);
    if (loading)
        return <LoadingSpinner />

    const commentsArr = []
    let i=0;
    for (let key in comments) {
        commentsArr[i] = comments[key];
        i++;
    }

    return (
        <div className="main">
            <MovieDetails movie={movie} setMovie={setMovie}/>
            <ActorsBox movieId={movieId}/>
            <CommentsBox comments={commentsArr} setComments={setComments}/>
        </div>
    );

}

function MovieDetails(props) {
    return (
        <div className={"movie-page-container"}>
            <div className="back-image"><img src={props.movie.coverImage} alt={props.movie.name}/></div>
            <div className="movie-detail">
                <Score movie={props.movie} setMovie={props.setMovie}/>
                <MovieInfo movie={props.movie}/>
                <AddToWatchList movie={props.movie}/>
            </div>
        </div>
    );
}



function Score(props) {
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setShow(false);
    }
    return (
        <div className="col-score">
            <dl className="desc">
                <dt dir="rtl"><h1>{props.movie.imdbRate}</h1></dt>
                {show? (
                    <div onClick={handleClick}>
                        <span className="iconify custom-icon-star" data-icon="emojione:star" o></span>
                    </div>) : (
                    <Stars setShow={setShow} setMovie={props.setMovie} movieId={props.movie.id} setLoading={setLoading}/>
                )}
                {loading? (<LoadingSpinner />) : (
                    <div>
                        <dt dir="rtl"> امتیاز کاربران {props.movie.rating}</dt>
                        <dt dir="rtl"> ({props.movie.ratingCount} رای)</dt>
                    </div>
                    )}
            </dl>
        </div>
    );
}

function Stars(props) {
    const handleClick= (rate) => {
        props.setShow(true);
        props.setLoading(true);
        postRate(props.movieId, 10 - rate)
            .then(res => {
                props.setMovie(res);
                props.setLoading(false);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            })

    }
    let stars = [];
    for(let i=0; i<10; i++)
        stars.push(Star(i, handleClick))

    return (
        <div className="rating">
            {stars}
        </div>
    );
}

function Star(index, handleClick) {
    return (
        <div className="rating">
            <input type="radio" name="rating" value={index} id={index} onClick={() => handleClick(index)}/>
            <label htmlFor={index}>☆</label>
        </div>
    );
}

function MovieInfo(props) {
    return (
        <div className="col-desc">
            <dl className="desc">
                <dt dir="rtl">{props.movie.name}</dt>
                <div className="sub-desc">
                    <dt dir="rtl"> کارگردان: {props.movie.director}</dt>
                    <dt dir="rtl"> نویسنده: {props.movie.writers.join(", ")}</dt>
                    <dt dir="rtl"> مدت زمان: {props.movie.duration} دقیقه</dt>
                </div>
                <dt dir="rtl"> تاریخ انتشار: {props.movie.releaseDate}</dt>
                <hr className="hor-line"/>
                <p>{props.movie.summary}</p>
            </dl>
        </div>
    );
}

function AddToWatchList(props) {
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => {
        setLoading(true);
        updateWatchList(props.movie.id, props.movie.ageLimit)
            .then(res => {
                setLoading(false);
                toast.info(res);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            })
    }
    return (
        <div className="col-image">
            <img src={props.movie.image} alt={props.movie.name} />
            {loading? (<LoadingSpinner />) : (
                <div className="add-to-watchList">
                    <input type="hidden" id="form_action" name="action" value="add"/>
                    <input type="hidden" id="form_movie_id" name="movie_id" value="1"/>
                    <button type="submit" onClick={handleSubmit}> افزودن به لیست</button>
                </div>
            )
            }
        </div>
    );
}

export default Movie;