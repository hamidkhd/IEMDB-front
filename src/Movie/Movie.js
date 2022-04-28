import React from 'react';
import './Movie.css';
import {useState, useEffect} from "react";
import {addComment, getMovie, getMovieActors, postMovieCommentRate, postRate} from "../Services/Movie";
import { useParams } from 'react-router-dom';
import {getUser} from "../Services/User";
import {getRecommendedMovies, updateWatchList} from "../Services/Watchlist";
import LoadingSpinner from "../common/LoadingSpinner";

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
            <Image img={props.movie.coverImage} alt={props.movie.name} className={"back-image"}/>
            <div className="movie-detail">
                <Score movie={props.movie} setMovie={props.setMovie}/>
                <MovieInfo movie={props.movie}/>
                <AddToWatchList movie={props.movie}/>
            </div>
        </div>
    );
}

function Image(props) {
    return (
        <div className={props.className}>
            <img src={props.img} alt={props.alt} />
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
                {show &&
                    <div onClick={handleClick}>
                        <span className="iconify custom-icon-star" data-icon="emojione:star" o></span>
                    </div>
                }
                {!show &&
                    <Stars setShow={setShow} setMovie={props.setMovie} movieId={props.movie.id} setLoading={setLoading}/>
                }
                {loading? (<LoadingSpinner />) : (
                    <div>
                        <dt dir="rtl"> امتیاز کاربران {props.movie.rating}</dt>
                        <dt dir="rtl"> ({props.movie.ratingCount} رای)</dt>
                    </div>
                    )
                }
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
    const handleSubmit = () => {
        updateWatchList(props.movie.id, props.movie.ageLimit)
            .then(res => {
                console.log('added');
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
                <div className="add-to-watchList">
                    <input type="hidden" id="form_action" name="action" value="add" />
                        <input type="hidden" id="form_movie_id" name="movie_id" value="1" />
                            <button type="submit" onClick={handleSubmit}> افزودن به لیست</button>
                </div>
        </div>
    );
}

function ActorsBox(props) {
    const [actors, setActors] = useState({});
    useEffect( () => {
        getMovieActors(props.movieId)
            .then(res => {
                setActors(res);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            });
    },[]);
    if (actors.length > 0) {
        let actorItem = [];
        for (let i=0; i<actors.length; i++) {
            actorItem.push(ActorItem(actors[i]));
        }
        return (
            <div className="actors-box">
                <div className="title"> بازیگران</div>
                <div className="images-list">
                    {actorItem}
                </div>
            </div>
        );

    }


}

function ActorItem(actor) {
    let url = "/actors/" + actor.id;
    return (
        <a href={url}>
            <div className="actors-box-img-container">
                <Image className={"actor-image-container"} img={actor.image} alt={actor.name} />
                <div className="actor-overlay">
                    <div className="overlay-text">
                        <div className="overlay-text">
                            <p> {actor.name} </p>
                            <p> {actor.age} </p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}

function CommentsBox(props) {
    const changeComments = (comment, i) => {
        let newComments = [...props.comments];
        newComments[i] = comment;
        props.setComments(newComments);
        console.log('done');
    }
    let commentItems = []
    for (let i=0; i<props.comments.length; i++)
        commentItems.push(CommentItem(props.comments[i], changeComments, i));
    return (
        <div className="comments-box">
            <div className="title"> دیدگاه ها</div>
            <div className="comments-list">
                <NewComment setComments={props.setComments} comments={props.comments} />
                {commentItems}
            </div>
        </div>
    );

}

function NewComment(props) {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        e.preventDefault();
        setComment(e.target.value);
    }
    const {movieId} = useParams();
    const handleSubmit =  (e) => {
        e.preventDefault();
        setLoading(true);
        addComment(movieId, comment)
            .then(res => {
                let newComments = [...props.comments];
                newComments.push(res);
                props.setComments(newComments);
                setLoading(false);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            })
    }
    return (
        <div className="comment">
            <div className="comment-text">
                <p> دیدگاه خود را اضافه کنید: </p>
                <hr className="hor-line" />
                {loading? (<LoadingSpinner />) : (
                    <div>
                        <form className="comment-form" action="/action_page.php" onSubmit={handleSubmit}>
                            <input type="text" className="com-txt" id="com-txt" name="text" onChange={handleChange}/>
                            <input type="submit" className="submit-button" value="ثبت"/>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

function CommentItem(comment, changeComment, index) {
    const callChangeComment = (newComment) => {
        changeComment(newComment, index);
    }
    return (
        <div className="comments">
            <p className="commenter-name"> {comment.username} </p>
            <hr className="hor-line" />
            <div className="comment-body">
                <div><p> {comment.text} </p></div>
                <div>
                    <CommentRate comment={comment} changeComment={callChangeComment}/>
                    <div className="comment-score">
                        <span>{comment.like}</span>
                        <span>{comment.dislike}</span>
                    </div>
                </div>
            </div>
        </div>

    );
}

function CommentRate(props) {
    const updateLike = (like) => {
        const userId = JSON.parse(localStorage.getItem("user")).email;
        postMovieCommentRate(props.comment.movieId, userId, props.comment.commentId, like)
            .then(res => {
                console.log("posted");
                console.log(res);
                props.changeComment(res);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            })
    }
    return (
        <div>
            <div onClick={() => updateLike("1")}>
            <span className="iconify like-icon" data-icon="eva:arrow-ios-upward-fill"
                  ></span>
            </div>
            <div onClick={() => updateLike("-1")}>
            <span className="iconify dislike-icon" data-icon="eva:arrow-ios-upward-fill"
                  data-rotate="180deg"></span>
            </div>
        </div>
    );
}
export default Movie;