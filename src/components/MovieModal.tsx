import React from 'react';
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import { MovieInterface } from '../services/themoviedb';
import { createUseStyles } from 'react-jss';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'black',
    },
};

const useStyles = createUseStyles({
    overview: {
        color: 'white',
        maxWidth: '640px',
    },
});

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 1 as 1,
    },
};

interface MovieModalProps extends MovieInterface {
    trailerID: string;
    open: boolean;
    url: string;
    setOpen: (value: boolean) => void;
}

export const MovieModal = ({
    open,
    setOpen,
    url,
    trailerID,
    overview,
    budget,
    rating,
}: MovieModalProps): JSX.Element => {
    const classes = useStyles();

    return (
        <Modal
            isOpen={open}
            onRequestClose={(): void => setOpen(false)}
            style={customStyles}
            contentLabel="Trailer Modal"
        >
            <YouTube videoId={trailerID} opts={opts} />
            <button onClick={(): void => setOpen(false)}>Close</button>
            <a href={url}>
                <button>Finnkino</button>
            </a>
            <p className={classes.overview}>Overview: {overview}</p>
            <p className={classes.overview}>Budget {budget} million</p>
            <p className={classes.overview}>Rating {rating}/10</p>
        </Modal>
    );
};
