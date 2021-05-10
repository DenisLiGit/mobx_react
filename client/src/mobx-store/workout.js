import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";

class Workout {
    constructor() {
        makeAutoObservable(this)
    }
    successMessage = ''
    errorMessage = ''

    workouts = []
    workout = {}

    setWorkout (data) {
        axios.post('/api/workout/setWorkout',
            {
                data
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                runInAction(() => {
                    this.successMessage = res.data.message
                })
            })
            .catch(err => {
                runInAction(() => {
                    this.errorMessage = err.response.data.message
                })
            })
    }

    getWorkouts () {
        axios.get('/api/workout/getWorkouts')
            .then(res => {
                runInAction(() => {
                    this.workouts = res.data.workouts
                });
            })
            .catch(err => {
                runInAction(() => {
                    this.errorMessage = err.response.data.message
                })
            })
    }

    getWorkout () {
        const currentId = window.localStorage.getItem('currentWorkout')
        axios.get(`/api/workout/getWorkout?workoutId=${currentId}`)
            .then(res => {
                runInAction(() => {
                    this.workout = res.data.workout[0]
                });
            })
            .catch(err => {
                runInAction(() => {
                    this.errorMessage = err.response.data.message
                });
            })
    }

    setCurrentWorkout (id) {
        window.localStorage.setItem('currentWorkout', id)
    }

}

export default Workout