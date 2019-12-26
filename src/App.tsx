import React, { useEffect, useState } from 'react';
import { useFinnkino } from './services/finnkino';
import { Movie } from './components/Movie';
import { getMovieDetails, MovieInterface } from './services/themoviedb';
import { createUseStyles } from 'react-jss';
import { Header } from './components/Header';

const useStyles = createUseStyles({
    '@global': {
        body: {
            backgroundColor: '#1C1C1E',
        },
        html: {
            backgroundColor: '#1C1C1E',
            overflowX: 'hidden',
        },
    },
    container: {
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
    },
    imageGrid: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gridAutoRows: 'minmax(100px, auto)',
    },
});

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

const App = (): JSX.Element => {
    const date = new Date();
    const dateString = `${date.getDate() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`;

    const [cinema, setCinema] = useState<any>({
        value: 1033,
        label: 'Pääkaupunkiseutu',
    });

    const data = useFinnkino(cinema.value, dateString);
    const [movies, setMovies] = useState<MovieInterface[]>([]);
    const classes = useStyles();

    useEffect(() => {
        const getData = async (): Promise<(MovieInterface | undefined)[]> =>
            await Promise.all(data.map(e => getMovieDetails(e)));
        getData().then(detailed => setMovies(detailed.filter(notEmpty).sort((a, b) => b.rating - a.rating)));
    }, [data]);

    return (
        <>
            <Header setCinema={setCinema} />
            <div className={classes.container}>
                <div className={classes.imageGrid}>
                    {movies.map((movie: MovieInterface) => (
                        <Movie key={movie.title} movie={movie} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default App;
