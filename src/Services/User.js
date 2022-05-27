import axios from "axios";

export async function getUser(username, password) {
    const url = `http://localhost:8080/getUser?${"username=" + username + "&password=" + password}`;
    console.log(url);
    const resp = await axios.get(
        `http://localhost:8080/getUser?${"username=" + username + "&password=" + password}`
    );
    return resp.data;
}