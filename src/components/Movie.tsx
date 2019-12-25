import React from "react";
import {createUseStyles} from 'react-jss'
import { MovieInterface } from "../App";

const useStyles = createUseStyles({
  image: {
    display: "inline-block",
  }
})

export const Movie = ({ title, url, rating, posterUrl }: MovieInterface) => {
  const classes = useStyles()

  return (
    <div className="image-item">
      <a href={url}>
        <img src={posterUrl} className={classes.image}/>
      </a>
    </div>
  );
};
