import {MOVIEDB_API_KEY} from '../'
import axios from 'axios'
import { FinnkinoEvent } from './finnkino'


export const getMovieDetails = async (event: FinnkinoEvent) => {
    const { data } = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_API_KEY}&query=${event.title.replace(" ", "+")}`)

    if (!data.results[0]) return;
    const {poster_path, vote_average } = data.results[0]
    const posterUrl = 'https://image.tmdb.org/t/p/w500' + poster_path
    return {...event, posterUrl, rating: vote_average}
}