import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "mobx-react";

import Exercise from './mobx-store/exercise'
import Workout from './mobx-store/workout'

const exerciseStore = new Exercise()
const workoutStore = new Workout()

ReactDOM.render(
    <Provider exerciseStore={exerciseStore} workoutStore={workoutStore}>
        <App />
    </Provider>,
  document.getElementById('root')
);
