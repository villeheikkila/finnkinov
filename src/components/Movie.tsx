import React from "react";
import { createUseStyles } from "react-jss";
import { MovieInterface } from "../App";

const useStyles = createUseStyles({
  imageContainer: {
    color: "white",
    position: "relative",
  },
  image: {
    display: "inline-block",
  },
  text: {
    position: "absolute", 
    bottom: "15px",
    width: "100%",
    textAlign: "center",
  },
  span: {
    color: "white",
    font: "bold 30px Roboto, Sans-Serif",
    letterSpacing: "-1px",
    background: "rgba(0, 0, 0, 0.7)",
    paddingTop: "3px",
    paddingBottom: "5px",
    paddingLeft: "10px",
    paddingRight: "10px"

  }
});

export const Movie = ({ title, url, rating, posterUrl }: MovieInterface) => {
  const classes = useStyles();

  const formattedRating = rating !== 0 ? rating.toFixed(1) : "Not available"

  return (
    <div className={classes.imageContainer}>
      <a href={url}>
        <img src={posterUrl} className={classes.image} alt={title} />
      </a>
      <div className={classes.text}><span className={classes.span}>{formattedRating}</span></div>
    </div>
  );
};
