import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { MovieInterface } from '../services/themoviedb';
import { MovieModal } from './MovieModal';

const useStyles = createUseStyles({
    imageContainer: {
        color: 'white',
        position: 'relative',
    },
    image: {
        display: 'inline-block',
    },
    text: {
        position: 'absolute',
        bottom: '15px',
        width: '100%',
        textAlign: 'center',
    },
    span: {
        color: 'white',
        font: 'bold 30px Roboto, Sans-Serif',
        letterSpacing: '-1px',
        background: 'rgba(0, 0, 0, 0.7)',
        paddingTop: '3px',
        paddingBottom: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
});

interface MovieProps {
    movie: MovieInterface;
}
export const Movie = ({ movie }: MovieProps): JSX.Element => {
    const classes = useStyles();
    const { title, url, rating, posterUrl } = movie;
    const [open, setOpen] = useState(false);

    const formattedRating = rating !== 0 ? rating.toFixed(1) : 'Not available';

    return (
        <>
            <div className={classes.imageContainer} onClick={() => setOpen(true)}>
                <img src={posterUrl} className={classes.image} alt={title} />
                <div className={classes.text}>
                    <span className={classes.span}>{formattedRating}</span>
                </div>
            </div>
            <MovieModal open={open} url={url} setOpen={setOpen} {...movie} />
        </>
    );
};
