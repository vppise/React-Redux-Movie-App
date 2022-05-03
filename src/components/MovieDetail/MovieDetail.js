import React, { useEffect } from 'react';
import "./MovieDetail.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncMovieDetail, fetchAsyncShowDetail, getSelectedMovieOrShow, removeSelectedMovie } from '../../features/movies/movieSlice';

const MovieDetail = () => {
    const { imdbID } = useParams()
    const dispatch = useDispatch()
    const data = useSelector(getSelectedMovieOrShow)
    console.log(data)
    useEffect(() => {
        dispatch(localStorage.getItem("selecType") == "Movie" ? fetchAsyncMovieDetail(imdbID) : fetchAsyncShowDetail(imdbID));
        return () => {
            dispatch(removeSelectedMovie())
        }

    }, [dispatch, imdbID])

    const destractureCountries = (info) => {
        let countries = []
        info.map(items => countries.push(items.name))
        return countries.toString()
    }
    const destractureGenres = (info) => {
        let geners = []
        info.map(items => geners.push(items.name))
        return geners.toString()
    }
    const calculateSeriesRuntime = (info) => {
        let calculatedTime = 0;
        info.map(mins => calculatedTime = mins + calculatedTime);
        return calculatedTime
    }



    return (
        <div className='movie-section' >
            <div className='section-left'>
                <img src={"https://image.tmdb.org/t/p/w200" + data.poster_path} alt='' />
            </div>
            <div className='section-right' style={{ backgroundImage: `URL(https://image.tmdb.org/t/p/w500${data.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <p className='movie_title'>{data.original_title ? data.original_title : data.original_name}</p>
                <p>Release Date : {data.release_date ? data.release_date : data.last_air_date}</p>
                <p>Countries : {data.production_countries && destractureCountries(data.production_countries)}</p>
                <p>Genres : {data.genres && destractureGenres(data.genres)}</p>
                <p>Duration : {data.runtime ? data.runtime : data.episode_run_time && calculateSeriesRuntime(data.episode_run_time)} Minutes</p>
                <p>Description : {data.overview}</p>
            </div>
            <div className='section-right'></div>
        </div>
    )
}

export default MovieDetail;