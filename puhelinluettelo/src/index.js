import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'

axios
    .get('http://localhost:3001/persons')
    .then(response => {
        const persons = response.data
        console.log(persons)
        ReactDOM.render(
            <App />,
            document.getElementById('root')
        );
    })



