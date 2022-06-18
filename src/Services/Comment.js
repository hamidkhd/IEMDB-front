import axios from "axios";

export async function postMovieCommentRate(movieId, userId, commentId, like) {
    const params = "?userId=" + userId + "&commentId=" + commentId + "&like=" + like;
    const resp = await axios.post(
        `http://87.247.187.217:31053/postMovieCommentRate${params}`
    );
    return resp.data
}

export async function addComment(movieId, text) {
    const params = "?userId=" + JSON.parse(localStorage.getItem("user")).email + "&movieId=" + movieId + "&text=" + text;
    const resp = await axios.post(
        `http://87.247.187.217:31053/addComment${params}`
    );
    return resp.data
}