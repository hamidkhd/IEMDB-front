import axios from "axios";

export async function getMovies(defaultSort, searchBy, searchValue) {
    const resp = await axios.get(
        `http://localhost:8080/IE_ca3_war_exploded/getMovies?${"defaultSort=" + defaultSort + "&searchBy=" + searchBy + "&searchValue=" + searchValue}`
    );
    return resp.data;
}

