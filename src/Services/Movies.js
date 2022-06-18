import axios from "axios";

export async function getMovies(defaultSort, searchBy, searchValue) {
    const resp = await axios.get(
        `http://87.247.187.217:31053/getMovies?${"defaultSort=" + defaultSort + "&searchBy=" + searchBy + "&searchValue=" + searchValue}`
    );
    return resp.data;
}

