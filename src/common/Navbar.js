import React, {useState} from 'react';
import '../Movies/Movies.css';
import templatePic from '../common/template.png'
import {Navigate} from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchBy:"name", value:""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
        console.log('ksfdh ' + this.state.value);
    }

    handleSubmit (e) {
        e.preventDefault()
        this.handleSearchType(this.state.searchBy);

    };

    logo() {
        return (
            <img className="logo" src={templatePic} alt="logo"/>
        );
    }

    searchBox() {
        return (
            <div className="search-box">
                <div className="search-container">
                    <form className="action-page" >
                        <button className="b" type="submit" onClick={this.handleSubmit}><i
                            className="fa fa-search"></i></button>
                        <input className="d" type="text" placeholder="" name="search" onChange={this.handleChange} />
                    </form>
                </div>
                <div className="search-dropdown">
                    <div className="search-filter">
                        <span className="iconify custom-icon" data-icon="mdi:triangle" data-rotate="180deg"></span>
                        <span className="search-dropdown-text">جست‌وجو براساس:</span>
                    </div>
                    <div className="search-dropdown-content">
                        <a  href="#" onClick={() => this.handleSearchType("name")}>نام</a>
                        <a  href="#" onClick={() => this.handleSearchType("genre")}>ژانر</a>
                        <a  href="#" onClick={() => this.handleSearchType("releaseDate")}>تاریخ تولید</a>
                    </div>
                </div>
            </div>
        );
    }

    handleSearchType(type) {
        this.setState({searchBy:type});
        console.log(this.state.value);
        this.props.searchDetails(type, this.state.value);
    }


    render() {
        return (
            <header>
                <nav className="navbar">
                    {this.logo()}
                    {(window.location.pathname == ("/") || window.location.pathname == ("/movies")) &&
                        this.searchBox()
                    }
                    <UserIcon />
                </nav>
            </header>
        );
    }
}

function UserIcon() {
    const [loading, setLoading] = useState(false);
    const logout = () => {
        localStorage.removeItem("user");
    }
    const login = localStorage.getItem("user") == null ? false:true;
    console.log(localStorage.getItem("user"));
    console.log(login);
    return (
        <div className="guest-dropdown">
            <span className="iconify" data-icon="bxs:user-circle"></span>
            <div className="guest-dropdown-content">
                {!login ? (
                    <div>
                        <a href="/login">ورود</a>
                        <a href="#">ثبت نام</a>
                    </div> ) : (
                    <div>
                        {/*{(localStorage.getItem("user") != null && !loading) &&*/}
                            <a href="">{JSON.parse(localStorage.getItem("user")).email}</a>
                        {/*}*/}
                        <a href="/watchlist">watchlist</a>
                        <a href="/" onClick={logout}>خروج</a>

                    </div>
                )
                }
            </div>
        </div>
    );
}



export default Navbar;