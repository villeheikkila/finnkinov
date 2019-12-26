import React from 'react';
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import { MovieInterface } from '../services/themoviedb';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    overview: {
        color: 'white',
        maxWidth: '1000px',
    },
    button: {
        backgroundColor: '#ECCB2F',
        color: 'white',
        border: 'none',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        padding: '15px 32px',
        fontWeight: 'bold',
        borderRadius: '5px',
        fontFamily: 'Work Sans',
        textTransform: 'uppercase',
        fontSize: 20,
    },
});

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
        fontFamily: 'Roboto',
        borderColor: '#ECCB2F',
    },
};

const options = {
    height: '563',
    width: '1000',
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

export const MovieModal = ({ open, setOpen, url, trailerID, overview, budget }: MovieModalProps): JSX.Element => {
    const classes = useStyles();
    const formattedBudget = budget ? `The budget was ${budget} million.` : '';

    return (
        <Modal
            isOpen={open}
            onRequestClose={(): void => setOpen(false)}
            style={customStyles}
            contentLabel="Trailer Modal"
        >
            <YouTube videoId={trailerID} opts={options} />

            <p className={classes.overview}>{overview}</p>
            <p className={classes.overview}></p>
            <p className={classes.overview}>{formattedBudget}</p>

            <a href={url}>
                <button className={classes.button}>Tickets</button>
            </a>
        </Modal>
    );
};
