import React, { useEffect, useState } from "react";
import { useFinnkino, FinnkinoEvent } from "./services/finnkino";
import { Movie } from "./components/Movie";
import { getMovieDetails } from "./services/themoviedb";
import { createUseStyles } from "react-jss";

export interface MovieInterface {
  title: string;
  url: string;
  posterUrl: string;
  rating: Number;
}

const useStyles = createUseStyles({
  "@global": {
    body: {
      backgroundColor: "#1C1C1E"
    },
    html: {
      backgroundColor: "#1C1C1E"
    }
  },
  container: {
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap"
  },
  imageGrid: {
    width: "90%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    gridAutoRows: "minmax(100px, auto)"
  },
  header: {
    fontSize: 70,
    color: "white",
    fontWeight: 800,
    fontFamily: 'PT Sans, sans-serif'
  }
});

const App = () => {
  const [data] = useFinnkino(1033, "27.12.2019");
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const classes = useStyles();

  useEffect(() => {
    const getData = async () =>
      await Promise.all(data.map(e => getMovieDetails(e)));
    getData().then((detailed: any) =>
      setMovies(detailed.sort((a: any, b: any) => b.rating - a.rating))
    );
  }, [data]);

  return (
    <div className={classes.container}>
      <header className={classes.header}>Movies running at Finnkino today</header>
      <div className={classes.imageGrid}>
        {movies.map((movie: MovieInterface) => (
          <Movie {...movie} />
        ))}
      </div>
    </div>
  );
};

export default App;
