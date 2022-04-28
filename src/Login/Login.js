import React, {useState} from "react";
import './Login.css';
import {getUser} from "../Services/User";
import LoadingSpinner from "../common/LoadingSpinner";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = e => {
        setLoading(true);
        e.preventDefault();
        getUser(username, password)
            .then(res => {
                if(res.name == "error")
                    window.location.replace("http://localhost:3000/login");
                else {
                    // localStorage.setItem("loggedIn", JSON.stringify(true));
                    // localStorage.setItem("user", JSON.stringify(res));
                    props.setLogin(true, res);
                    window.location.replace("http://localhost:3000/");
                }
                setLoading(false);
                })
            .catch(error => {
            if (error.response)
                console.log(error.response.data);
            else
                console.log(error);
        })
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className={"login-container"}>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h2 className="title"> ورود </h2>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"></span>
                            <input type="text" className="form-control" name="username" placeholder="نام کاربری"
                               required="required" value={username} onChange={handleChangeUsername}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"></span>
                            <input type="text" className="form-control" name="password" placeholder="رمز ورود"
                               required="required" value={password} onChange={handleChangePassword}/>
                        </div>
                    </div>
                    <div className="form-group">
                        {loading? (<LoadingSpinner />) : (
                            <button type="submit" className="login-key btn btn-primary btn-lg"> ورود</button>)
                        }
                    </div>
                </form>
                <div className="text-center"> آیا از قبل حساب کاربری ندارید؟ <a href="/Signup"> ثبت نام </a></div>
            </div>
        </div>
    );
}

export default Login;