import axios from "axios";

export async function getMovie(id) {
    const resp = await axios.get(
        `http://localhost:8080/IE_ca3_war_exploded/getMovie/${id}`
    );
    return resp.data;
}


export async function getMovieActors(id) {
    const resp = await axios.get(
        `http://localhost:8080/IE_ca3_war_exploded/getMovieActors/${id}`
    );
    return resp.data;
}


export async function postRate(movieId, rate) {
    let userId = JSON.parse(localStorage.getItem("user")).email;
    const params = "/" + movieId + "?userId=" + userId + "&rate=" + rate;
    const resp = await axios.post(
        `http://localhost:8080/IE_ca3_war_exploded/postRate${params}`
    );
    return resp.data
}

