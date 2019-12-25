import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export const MOVIEDB_API_KEY = process.env.REACT_APP_MOVIEDB
ReactDOM.render(<App />, document.getElementById('root'));
