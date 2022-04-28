import React, {useEffect, useState} from "react";
import {getMovieActors} from "../Services/Movie";
import LoadingSpinner from "../common/LoadingSpinner";

function ActorsBox(props) {
    const [actors, setActors] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect( () => {
        setLoading(true);
        getMovieActors(props.movieId)
            .then(res => {
                setActors(res);
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
        return <LoadingSpinner />
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

function ActorItem(actor) {
    let url = "/actors/" + actor.id;
    return (
        <a href={url}>
            <div className="actors-box-img-container">
                <div className="actor-image-container"><img src={actor.image} alt={actor.name}/></div>
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

export default ActorsBox;