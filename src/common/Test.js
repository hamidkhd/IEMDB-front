import {Navigate, Outlet} from "react-router-dom";
import React from 'react';


const useAuth = () => {
    const user = JSON.parse(localStorage.getItem("loggedIn"))
    if (user)
        return true
    else
        return false
}

function ProtectedRoutes({login, children}) {

    console.log(login)
    console.log(JSON.parse(localStorage.getItem("loggedIn")))
    if (!JSON.parse(localStorage.getItem("loggedIn")))
        return <Navigate to="/login"/>
    return children?children:<Outlet/>
}

export default ProtectedRoutes;