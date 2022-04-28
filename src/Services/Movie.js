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

export async function postMovieCommentRate(movieId, userId, commentId, like) {
    const params = movieId + "?userId=" + userId + "&commentId=" + commentId + "&like=" + like;
    const resp = await axios.post(
        `http://localhost:8080/IE_ca3_war_exploded/postMovieCommentRate/${params}`
    );
    return resp.data
}

export async function addComment(movieId, text) {
    const params = "?userId=" + JSON.parse(localStorage.getItem("user")).email + "&movieId=" + movieId + "&text=" + text;
    const resp = await axios.post(
        `http://localhost:8080/IE_ca3_war_exploded/addComment${params}`
    );
    return resp.data
}

export async function postRate(movieId, rate) {
    let userId = JSON.parse(localStorage.getItem("user")).email;
    const params = "/" + movieId + "?userId=" + userId + "&rate=" + rate;
    const resp = await axios.post(
        `http://localhost:8080/IE_ca3_war_exploded/postRate${params}`
    );
    return resp.data
}

