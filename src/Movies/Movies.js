import { useState } from 'react';
import { useEffect } from 'react';
import React from "react";
import './Movies.css'
import {getMovies} from "../Services/Movies";

class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {movies: [], defaultSort:true};
    }

    render() {
        return (
            <div className="main">
                <div className="row">
                    <SortingOptions onClickSortByRate={() => this.handleSortOption(true)} onClickSortByDate={() => this.handleSortOption(false)}/>
                    {this.state.movies.length > 0 &&
                        <div className="flex-center col-8 mt-5 pt-5">
                            <MoviesList movies={this.state.movies}/>
                        </div>
                    }
                </div>
            </div>
        );
    }

    handleSortOption(byRate) {
        this.setState({defaultSort:byRate});
    }

    showMovies() {
        getMovies(this.state.defaultSort, this.props.searchBy, this.props.searchValue)
            .then(res => {
                this.setState(prevState => ({movies:res}));
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            });
    }

    componentDidMount() {
        this.showMovies(true);
    }

    componentDidUpdate(preProps,prevState) {
        if (preProps.searchValue != this.props.searchValue || preProps.searchBy != this.props.searchBy
            || prevState.defaultSort != this.state.defaultSort) {
            this.showMovies();
      }
    }
}

function SortingOptions(props) {
    return (
        <div className="flex-right col-2">
            <div className="sorting"><h2> رتبه بندی بر اساس: </h2></div>
            <div className="sorting-table mt-3">
                <a href="#" onClick={() => props.onClickSortByDate()}> تاریخ</a>
                <div onClick={() => props.onClickSortByRate()}><h3> امتیاز imdb </h3></div>
            </div>
        </div>
    );
}

class MoviesList extends React.Component {
    showRows(i) {
        return (
            <div className="images-list">
                {this.movie(4 * i)}
                {this.movie(4 * i + 1)}
                {this.movie(4 * i + 2)}
                {this.movie(4 * i + 3)}
            </div>
        );
    }

    movie(index) {
        if (index > this.props.movies.length - 1)
            return null;
        let url = "/movies/" + this.props.movies[index].id;
        return (
            <a href={url}>
                <div className="movie">
                    <img src={this.props.movies[index].image} alt={this.props.movies[index].name} className="image" />
                        <div className="movie-overlay">
                            <div className="overlay-text">
                                <p> {this.props.movies[index].name} </p>
                                <p> {this.props.movies[index].imdbRate} </p>
                            </div>
                        </div>
                </div>
            </a>
        );
    }

    render() {
        let rows = [];
        let end = this.props.movies.length >= 16 ? 4 : this.props.movies.length/4;
        for (let i = 0; i < end; i++) {
            rows.push(this.showRows(i));
        }
        return rows;
    }
}





export default Movies;