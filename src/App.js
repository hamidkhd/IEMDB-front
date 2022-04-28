import './App.css';
import Navbar from './common/Navbar';
import Movies from './Movies/Movies';
import Movie from "./Movie/Movie";
import Login from "./Login/Login";
import {BrowserRouter, Navigate, Route, Routes, Outlet} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getMovie} from "./Services/Movie";
import Actor from './Actor/Actor';
import Watchlist from "./Watchlist/Watchlist";
import ProtectedRoute from "./common/Test";
import ProtectedRoutes from "./common/Test";

function App() {

    const [searchBy, setSearchBy] = useState("name");
    const [searchValue, setSearchValue] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const changeSearchOptions = (newSearchBy, newSearchValue) => {
        setSearchBy(newSearchBy);
        setSearchValue(newSearchValue);
        console.log(searchBy);
        console.log('value ' + searchValue);
        console.log(newSearchValue);
    }

    useEffect(() => {
        console.log("salaaaaam", searchValue)
    }, [searchValue])

    const changeLogin = (login, loggedUser) => {
        console.log('changed');
        setLoggedIn(login);
        setUser(loggedUser);
    }


    useEffect(() => {
        setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));

    }, []);

    useEffect(() => {
        localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    }, [loggedIn]);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const routes =(
        <Routes>
            <Route exact path="/" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />
            <Route exact path="/movies" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />
            <Route path="/movies/:movieId" element={<Movie />}/>
            <Route path="/actors/:actorId" element={<Actor />}/>
            <Route path="/watchlist" element={<Watchlist /> } />
        </Routes>
    )
    const otherRoutes = (
        <Routes>
            <Route exact path="/" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />
            <Route exact path="/movies" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />
            <Route path="*" element={<Login setLogin={changeLogin}/>}/>
        </Routes>
    )
    return (
        <header>

            <BrowserRouter forceRefresh={true}>
                <Navbar searchDetails={changeSearchOptions} login={loggedIn} user={user}/>
                {/*<Routes forceRefresh={true}>*/}
                {/*    <Route path="/login" element={<Login setLogin={changeLogin} login={loggedIn}/>}/>*/}
                {/*    <Route element={<ProtectedRoutes login={loggedIn}/>} >*/}

                {/*    <Route exact path="/" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />*/}
                {/*    <Route exact path="/movies" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />*/}
                {/*    <Route path="/movies/:movieId" element={<Movie />}/>*/}
                {/*    <Route path="/movies/:movieId" element={<RequireAuth> <Movie/> </RequireAuth>}/>*/}

                {/*    <Route path="/actors/:actorId" element={<Actor />}/>*/}
                {/*    <Route path="/watchlist" element={<Watchlist /> } />*/}
                {/*</Route>*/}
                {/*    /!*<Route children={<Movies />}/>*!/*/}

                {/*    <Route path="*" element={<p>There's nothing here: 404!</p>} />*/}

                {/*</Routes>*/}
                {loggedIn ? routes : otherRoutes}

            </BrowserRouter>
        </header>
    );
}




function RequireAuth({ children }) {
    const { authed } = JSON.parse(localStorage.getItem("loggedIn"));

    return authed === true ? <Outlet /> : <Navigate to="/login" replace />;
}

// function ProtectedRoute({ component: Component, ...restOfProps }) {
//     const isAuthenticated = localStorage.getItem("loggedIn");
//     console.log("this", isAuthenticated);
//
//     return (
//         <Route
//             {...restOfProps}
//             render={(props) =>
//                 isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
//             }
//         />
//     );
// }

export default App;
