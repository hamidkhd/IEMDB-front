import axios from "axios";

export async function getMovie(id) {
    const resp = await axios.get(
        `http://87.247.187.217:31053/getMovie/${id}`
    );
    return resp.data;
}


export async function getMovieActors(id) {
    const resp = await axios.get(
        `http://87.247.187.217:31053/getMovieActors/${id}`
    );
    return resp.data;
}


export async function postRate(movieId, rate) {
    let userId = JSON.parse(localStorage.getItem("user")).email;
    const params = "/" + movieId + "?userId=" + userId + "&rate=" + rate;
    const resp = await axios.post(
        `http://87.247.187.217:31053/postRate${params}`
    );
    return resp.data
}

