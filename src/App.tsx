import React, { useEffect, useState } from 'react';
import { useFinnkino, FinnkinoEvent }from './services/finnkino'
import { Movie } from './components/Movie';
import { getMovieDetails } from './services/themoviedb'

export interface MovieInterface {
  title: string,
  url: string,
  posterUrl: string,
  rating: Number
}

const App = () => {
  const [data] = useFinnkino(1033, "27.12.2019")
  const [movies, setMovies] = useState<MovieInterface[]>([]);

  useEffect(() => {
    const getData = async () => (await Promise.all(data.map((e) =>getMovieDetails(e))))
    getData().then((detailed: any) => setMovies(detailed.sort((a: any, b: any) => b.rating - a.rating)))
  }, [data])

  return (
    <div>
        {movies.map((movie: MovieInterface) =>  (<Movie {...movie}/>))}
    </div>
  );
}

export default App;
