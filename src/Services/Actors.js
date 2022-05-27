import axios from "axios";

export async function getActorMovies(id) {
    const resp = await axios.get(
        `http://localhost:8080/getActorMovies/${id}`
    );
    return resp.data;
}

export async function getActor(id) {
    const resp = await axios.get(
        `http://localhost:8080/getActor/${id}`
    );
    return resp.data;
}