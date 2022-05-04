import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSearchedMovies, searchAsynchMovies, searchAsyncSeries } from '../../features/movies/movieSlice';
import user from '../../images/user.jpg';
import './Header.scss';

const Header = () => {
    const dispatch = useDispatch();
    const [query, Setquery] = useState("")
    const searchMoviesAndSeries = (e) => {

        e.preventDefault()
        dispatch(searchAsynchMovies(query));
        dispatch(searchAsyncSeries(query));
        Setquery("");
        console.log(window.location.pathname)
    }

    return (
        <div className='header'>
            <Link to='/'>
                <div className='logo'>Movie App</div>
            </Link>
            <div className='search-movies'>
                <form onSubmit={(e) => searchMoviesAndSeries(e)}>
                    <input type='text' value={query} onChange={(e) => Setquery(e.target.value)} placeholder='Search Movie/Shows' className='search-box' />
                    <i className="fa-solid fa-magnifying-glass" typeof='submit'></i>
                </form>
            </div>
            <div className='user-image'>
                <img src={user} alt='user' />
            </div>
        </div>
    )
}

export default Header