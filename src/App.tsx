import React, { useEffect, useState } from 'react';
import { useFinnkino } from './services/finnkino';
import { Movie } from './components/Movie';
import { getMovieDetails, MovieInterface } from './services/themoviedb';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    '@global': {
        body: {
            backgroundColor: '#1C1C1E',
        },
        html: {
            backgroundColor: '#1C1C1E',
        },
    },
    container: {
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
    },
    imageGrid: {
        width: '90%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gridAutoRows: 'minmax(100px, auto)',
    },
    header: {
        fontSize: 70,
        color: 'white',
        fontWeight: 800,
        fontFamily: 'PT Sans, sans-serif',
    },
});

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

const App = (): JSX.Element => {
    const date = new Date();
    const dateString = `${date.getDate() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const data = useFinnkino(1033, dateString);
    const [movies, setMovies] = useState<MovieInterface[]>([]);
    const classes = useStyles();

    useEffect(() => {
        const getData = async (): Promise<(MovieInterface | undefined)[]> =>
            await Promise.all(data.map(e => getMovieDetails(e)));
        getData().then(detailed => setMovies(detailed.filter(notEmpty).sort((a, b) => b.rating - a.rating)));
    }, [data]);

    return (
        <div className={classes.container}>
            <header className={classes.header}>Finnkino today</header>
            <div className={classes.imageGrid}>
                {movies.map((movie: MovieInterface) => (
                    <Movie key={movie.title} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default App;
