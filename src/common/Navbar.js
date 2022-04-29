import React, {useState} from 'react';
import '../Movies/Movies.css';
import templatePic from '../common/template.png'
import {userLoggedIn, userLogout} from "../Services/UserManager";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchBy:"name", value:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit (e) {
        e.preventDefault();
        this.handleSearchType(this.state.searchBy);
    };

    handleSearchType(type) {
        this.setState({searchBy:type});
        this.props.searchDetails(type, this.state.value);
    }

    logo() {
        return (
            <img className="logo" src={templatePic} alt="logo"/>
        );
    }

    searchValueBox() {
        return (
            <div className="search-container">
                <form className="action-page" >
                    <button className="b" type="submit" onClick={this.handleSubmit}><i
                        className="fa fa-search"></i></button>
                    <input className="d" type="text" placeholder="" name="search" onChange={this.handleChange} />
                </form>
            </div>
        );
    }

    searchTypeBox() {
        return (
            <div className="search-dropdown">
                <div className="search-filter">
                    <span className="iconify custom-icon-arrows" data-icon="mdi:triangle" data-rotate="180deg"></span>
                    <span className="search-dropdown-text">جست‌وجو براساس:</span>
                </div>
                <div className="search-dropdown-content">
                    <a  href="#" onClick={() => this.handleSearchType("name")}>نام</a>
                    <a  href="#" onClick={() => this.handleSearchType("genre")}>ژانر</a>
                    <a  href="#" onClick={() => this.handleSearchType("releaseDate")}>تاریخ تولید</a>
                </div>
            </div>
        );
    }

    searchBox() {
        return (
            <div className="search-box">
                {this.searchValueBox()}
                {this.searchTypeBox()}
            </div>
        );
    }

    render() {
        return (
            <header>
                <nav className="navbar">
                    {this.logo()}
                    {(window.location.pathname == ("/") || window.location.pathname == ("/movies")) &&
                        this.searchBox()
                    }
                    <UserIcon showLogoutToast={this.props.showLogoutToast}/>
                </nav>
            </header>
        );
    }
}

function UserIcon(props) {
    const logout = () => {
       userLogout();
    }
    return (
        <div className="guest-dropdown">
            <span className="iconify" data-icon="bxs:user-circle"></span>
            <div className="guest-dropdown-content">
                {!userLoggedIn() ? (
                    <div>
                        <a href="/login">ورود</a>
                        <a href="/signup">ثبت نام</a>
                    </div> ) : (
                    <div>
                        <a href="">{JSON.parse(localStorage.getItem("user")).email}</a>
                        <a href="/watchlist">watchlist</a>
                        <a href="/" onClick={logout}>خروج</a>
                    </div>
                )}
            </div>
        </div>
    );
}



export default Navbar;