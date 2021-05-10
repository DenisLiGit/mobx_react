const express = require('express')
const router = express.Router()
const Workout = require('../models/Workout')

router.post(
    '/setWorkout',
    async (req, res) => {
        const workout = req.body.data
        console.log(workout)
        try {
            const candidate = await Workout.findOne({title: workout.title})

            if (candidate) {
                res.status(401).json({"message": "Уже существует"})
            } else {
                const workoutNew = new Workout(workout)
                await workoutNew.save()
                res.status(201).json({'message': 'Тренировка сохранена'})
            }
        } catch (e) {
            res.status(500).json({'message': 'Что то пошло нетак'})
        }
    }
)

router.get(
    '/getWorkouts',
    async (req, res) => {

        try {
            const workouts = await Workout.find({})
            if (!workouts.length) {
                res.status(404).json({'message': 'Добавьте расписание'})
            } else {
                res.status(201).json({workouts})
            }
        } catch (e) {
            res.status(500).json({'message': 'Ошибка соединения с сервером'})
        }
    }
)

router.get(
    '/getWorkout',
    async (req, res) => {
        const workoutId = req.query.workoutId

        try {
            const workout = await Workout.find({_id: workoutId})
            if (!workout.length) {
                res.status(404).json({'message': 'Добавьте расписание'})
            } else {
                res.status(201).json({workout})
            }
        } catch (e) {
            res.status(500).json({'message': 'Ошибка соединения с сервером'})
        }
    }
)

router.delete(
    '/deleteShedule',
    async (req, res) => {
        const userId = req.query.userId
        const sheduleId = req.query.sheduleId

        try {
            const candidate = await Shedule.findOne({userId: userId})

            if (!candidate) {
                res.status(400).json({message: 'Что то пошло не так'})
            } else {
                candidate.shedules = candidate.shedules.filter(item => {
                    return item._id != sheduleId
                })

                await candidate.save()
                res.status(201).json({message: 'Время удалено'})
            }
        } catch (e) {
            res.status(500).json({'message': 'Ошибка удаления'})
        }
    }
)

module.exports = router