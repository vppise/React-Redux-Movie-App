import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/MovieApiKey'

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async () => {
    const response = await movieApi.get(`3/movie/popular?api_key=${APIKey}&language=en-US&page=1`)
    return response.data;
})
export const fetchAsyncMovieDetail = createAsyncThunk('movies/fetchAsyncMovieDetail', async (id) => {
    const response = await movieApi.get(`3/movie/${id}?api_key=${APIKey}&language=en-US&page=1`)
    return response.data;
})
export const fetchAsyncShowDetail = createAsyncThunk('movies/fetchAsyncShowDetail', async (id) => {
    const response = await movieApi.get(`3/tv/${id}?api_key=${APIKey}&language=en-US&page=1`)
    return response.data;
})
export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async () => {
    const response = await movieApi.get(`3/tv/popular?api_key=${APIKey}&language=en-US&page=1`)
    return response.data;
})
export const searchAsynchMovies = createAsyncThunk('movies/searchAsynchMovies', async (name) => {
    const response = await movieApi.get(`3/search/movie?api_key=${APIKey}&language=en-US&query=${name}`)
    return response.data;
})
export const searchAsyncSeries = createAsyncThunk('movies/searchAsyncSeries', async (name) => {
    const response = await movieApi.get(`3/search/tv?api_key=${APIKey}&language=en-US&query=${name}`)
    return response.data;
})

const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

        removeSelectedMovie: (state) => {
            state.selectedMovieOrShow = {}
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("pending")
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log('fetch successfully')
            return { ...state, movies: payload }
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("rejected")
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log('fetch successfully')
            return { ...state, shows: payload }
        },
        [fetchAsyncMovieDetail.fulfilled]: (state, { payload }) => {
            console.log('fetch successfully')
            return { ...state, selectedMovieOrShow: payload }
        },
        [fetchAsyncShowDetail.fulfilled]: (state, { payload }) => {
            console.log('fetch successfully')
            return { ...state, selectedMovieOrShow: payload }
        },
        [searchAsynchMovies.fulfilled]: (state, { payload }) => {
            console.log('Search Successful');
            return { ...state, movies: payload }
        },
        [searchAsyncSeries.fulfilled]: (state, { payload }) => {
            console.log('searched series');
            return { ...state, shows: payload }
        }
    }
});

export const { removeSelectedMovie } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export const getSearchedMovies = (state) => state.movies.movies;
export default movieSlice.reducer;