import { MOVIEDB_API_KEY } from '../';
import axios from 'axios';
import { FinnkinoEvent } from './finnkino';

export interface MovieInterface {
    title: string;
    url: string;
    posterUrl: string;
    rating: number;
    trailerID: string;
    budget: number;
    overview: string;
}

export const getMovieDetails = async (event: FinnkinoEvent): Promise<MovieInterface | undefined> => {
    try {
        const { data } = await axios(
            `https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_API_KEY}&query=${event.title.replace(
                ' ',
                '+',
            )}`,
        );

        if (!data.results[0]) return;
        const { id, poster_path, vote_average } = data.results[0];

        const { data: fullData } = await axios(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIEDB_API_KEY}&append_to_response=videos`,
        );

        const { overview, videos, budget } = fullData;
        const trailerID = videos.results[0] && videos.results[0].key;
        const budgetMillions = budget && budget / 1000000;
        const posterUrl = 'https://image.tmdb.org/t/p/w500' + poster_path;

        return { ...event, posterUrl, rating: vote_average, trailerID, budget: budgetMillions, overview };
    } catch (error) {
        console.error(error);
    }
};
