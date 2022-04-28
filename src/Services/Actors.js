import axios from "axios";

export async function getActorMovies(id) {
    const resp = await axios.get(
        `http://localhost:8080/IE_ca3_war_exploded/getActorMovies/${id}`
    );
    return resp.data;
}

export async function getActor(id) {
    const resp = await axios.get(
        `http://localhost:8080/IE_ca3_war_exploded/getActor/${id}`
    );
    return resp.data;
}