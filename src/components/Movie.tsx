import React from 'react';
import { getMovieDetails } from '../services/themoviedb'
import { MovieInterface } from '../App';

interface MovieProps {
    title: string,
    url: string,
}

export const Movie = ({title, url, rating, posterUrl }: MovieInterface) => {
  return (
    <div>
        <a href={url}>{title}</a>{rating} <a href={posterUrl}>{posterUrl}</a>
    </div>
  );
}
