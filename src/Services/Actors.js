import axios from "axios";

export async function getActorMovies(id) {
    const resp = await axios.get(
        `http://87.247.187.217:31053/getActorMovies/${id}`
    );
    return resp.data;
}

export async function getActor(id) {
    const resp = await axios.get(
        `http://87.247.187.217:31053/getActor/${id}`
    );
    return resp.data;
}