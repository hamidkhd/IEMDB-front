import axios from "axios";

export async function getWatchList() {
    const userId = JSON.parse(localStorage.getItem("user")).email
    const resp = await axios.get(
        `http://localhost:8080/getWatchlist/${userId}`
    );
    return resp.data;
}

export async function updateWatchList(movieId, ageLimit) {
    const userId = JSON.parse(localStorage.getItem("user")).email;
    const url = userId + "?movieId=" + movieId + "&ageLimit=" + ageLimit;
    const resp = await axios.post(
        `http://localhost:8080/addToWatchlist/${url}`
    );
    return resp.data;
}

export async function deleteFromWatchList(movieId) {
    const userId = JSON.parse(localStorage.getItem("user")).email;
    const url = userId + "?movieId=" + movieId;
    const resp = await axios.delete(
        `http://localhost:8080/deleteFromWatchlist/${url}`
    );
    return resp.data;
}

export async function getRecommendedMovies() {
    const userId = JSON.parse(localStorage.getItem("user")).email;
    console.log(userId);
    const resp = await axios.get(
        `http://localhost:8080/getRecommendedMovies/${userId}`
    );
    return resp.data;
}
