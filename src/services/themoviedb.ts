import { MOVIEDB_API_KEY } from '../';
import axios from 'axios';
import { FinnkinoEvent } from './finnkino';

export interface MovieInterface {
    title: string;
    url: string;
    posterUrl: string;
    rating: number;
    trailerID: string;
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

        const { data: videoData } = await axios(
            `http://api.themoviedb.org/3/movie/${id}/videos?api_key=${MOVIEDB_API_KEY}`,
        );

        const trailerID = data.results[0] && videoData.results[0].key;
        console.log('video ', videoData);
        const posterUrl = 'https://image.tmdb.org/t/p/w500' + poster_path;
        return { ...event, posterUrl, rating: vote_average, trailerID };
    } catch (error) {
        console.error(error);
    }
};
