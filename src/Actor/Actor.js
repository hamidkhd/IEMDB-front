import './Actor.css';
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import {getMovie} from "../Services/Movie";
import {getActorMovies, getActor} from "../Services/Actors";
import LoadingSpinner from "../common/LoadingSpinner";
import MoviesList from "../common/MoviesListBox";

function Actor(props) {
    const [actor, setActor] = useState(null);
    const [actorMovies, setActorMovies] = useState({});
    const [loading, setLoading] = useState(true);
    const { actorId } = useParams();

    useEffect( () => {
        getActorMovies(actorId)
            .then(m => {
                setActorMovies(m);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            });
    },[]);

    useEffect( () => {
        getActor(actorId)
            .then(res => {
                setActor(res);
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
        return <LoadingSpinner />;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="flex-right col-8">
                    <div className="row1"><h2> مشخصات بازیگر </h2></div>
                    <ActorInformation actor={actor} movieNum={actorMovies.length}/>
                    <div className="row1"><h2> فیلم ها </h2></div>
                    <div className="row4">
                        <MoviesList movies={actorMovies}/>
                    </div>
                </div>
                <div className="flex-left col-4">
                    <img src={actor.image} alt={actor.name}/>
                </div>
            </div>
        </div>
    );
}

function ActorInformation(props) {
    return (
        <div className="row2">
            <dl>
                <dt dir="rtl">{props.actor.name}</dt>
                <dt dir="rtl"> تاریخ تولد: <span> {props.actor.birthDate} </span></dt>
                <dt dir="rtl"> ملیت: <span> {props.actor.nationality} </span></dt>
                <dt dir="rtl"> تعداد فیلم ها: <span> {props.movieNum} </span></dt>
            </dl>
        </div>
    );
}


export default Actor;