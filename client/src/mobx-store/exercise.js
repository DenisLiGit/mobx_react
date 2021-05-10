import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";

class Exercise {
    constructor() {
        makeAutoObservable(this)
    }

    exercises = []

    successMessage = ''
    errorMessage = ''


    setExercise(data) {
        axios.post(
            '/api/exercise/setExercise',
            {
                data
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            runInAction(() => {
                this.successMessage = res
            })
        }).catch(err => {
            runInAction(() => {
                this.errorMessage = err.response.data.message
            })
        })
    }

    getExercise() {
        axios.get('/api/exercise/getExercise')
            .then(res => {
                runInAction(() => {
                    this.exercises = res.data.exercise
                })
            })
            .catch(err => {
                runInAction(() => {
                    this.errorMessage = err
                })
            })
    }

}

export default Exercise