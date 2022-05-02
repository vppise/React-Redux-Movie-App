import React from 'react';
import { Link } from 'react-router-dom';
import "./MovieCard.scss";

const MovieCard = (props) => {
    const { data } = props;
    const setSelectionType = (name) => {
        localStorage.setItem("selecType", name)
    }
    return (
        <div className='card-item' onClick={() => setSelectionType(data.hasOwnProperty('title') ? "Movie" : "Series")}>
            <Link to={`/movie/${data.id}`} >
                <div className='card-inner'>
                    <div className='card-top'>
                        <img src={"https://image.tmdb.org/t/p/w200" + data.poster_path} alt={data.original_title} />
                    </div>
                    <div className='card-bottom'>
                        <div className='card-info'>
                            <h4>{data.hasOwnProperty('title') ? data.title : data.name}</h4>
                            <p>{data.hasOwnProperty('release_date') ? data.release_date : data.first_air_date}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default MovieCard;