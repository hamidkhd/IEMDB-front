import axios from "axios";

export async function getUser(username, password) {
    const url = `http://87.247.187.217:31053/getUser?${"username=" + username + "&password=" + password}`;
    console.log(url);
    const resp = await axios.get(
        `http://87.247.187.217:31053/getUser?${"username=" + username + "&password=" + password}`
    );
    return resp.data;
}