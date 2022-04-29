import './App.css';
import Navbar from './common/Navbar';
import Movies from './Movies/Movies';
import Movie from "./Movie/Movie";
import Login from "./UserSession/Login/Login";
import {BrowserRouter, Navigate, Route, Routes, Outlet} from 'react-router-dom';
import {useEffect, useState} from "react";
import Actor from './Actor/Actor';
import Watchlist from "./Watchlist/Watchlist";
import {toast} from "react-toastify";
import {userLoggedIn} from "./Services/UserManager";
import Signup from "./UserSession/Signup/Signup";


toast.configure();
function App() {
    const [searchBy, setSearchBy] = useState("name");
    const [searchValue, setSearchValue] = useState("");
    const changeSearchOptions = (newSearchBy, newSearchValue) => {
        setSearchBy(newSearchBy);
        setSearchValue(newSearchValue);
    }

    const loginUserRoutes =(
        <Routes>
            <Route exact path="/" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />
            <Route exact path="/movies" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />
            <Route path="/movies/:movieId" element={<Movie />}/>
            <Route path="/actors/:actorId" element={<Actor />}/>
            <Route path="/watchlist" element={<Watchlist /> } />
            <Route path="*" element={<p>Nothing here</p>} />
        </Routes>
    )
    const guestRoutes = (
        <Routes>
            <Route exact path="/" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />
            <Route exact path="/movies" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />}/>
        </Routes>
    )

    return (
        <header>
            <BrowserRouter forceRefresh={true}>
                <Navbar searchDetails={changeSearchOptions} />
                {userLoggedIn() ? loginUserRoutes : guestRoutes}
            </BrowserRouter>
        </header>
    );
}


export default App;
