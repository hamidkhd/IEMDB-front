import React, {useState} from 'react';
import {passwordsMatch, validateEmail} from "../Utils";
import {toast} from "react-toastify";

function Signup(props) {
    const [name, setName] = useState("");
    const [nickName, setNickname] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPass, setRepeatPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        validateEmail(username);
        passwordsMatch(password, repeatPass);
    }

    return (
        <div className="signup-form">
            <form onSubmit={handleSubmit}>
                <h2 className="title">ثبت نام</h2>
                <Input placeholder={"نام"} setter={setName}/>
                <Input placeholder={"نام مستعار"} setter={setNickname}/>
                <Input placeholder={"تاریخ تولد"} setter={setBirthDate}/>
                <Input placeholder={"نام کاربری"} setter={setUsername}/>
                <Input placeholder={"رمز ورود"} setter={setPassword}/>
                <Input placeholder={"تکرار رمز ورود"} setter={setRepeatPass}/>
                <div className="form-group">
                    <button type="submit" className="signup-key btn btn-primary btn-lg">ثبت نام</button>
                </div>
            </form>
            <div className="text-center"> آیا از قبل حساب کاربری دارید؟ <a href="/login"> ورود </a></div>
        </div>
    )
}

function Input(props) {
    const handleChange = (e) => {
        props.setter(e.target.value);
    }

    return (
        <div className="form-group">
            <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                <input type="text" className="form-control" placeholder={props.placeholder} onChange={handleChange}
                       required="required" />
            </div>
        </div>
    )
}

export default Signup;