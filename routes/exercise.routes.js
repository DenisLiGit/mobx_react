const express = require('express')
const router = express.Router()
const Exercise = require('../models/Exercise')

router.post(
    '/setExercise',
    async (req, res) => {
        const exrcise = req.body.data

        try {
            const candidate = await Exercise.findOne({title: exrcise.title})

            if (candidate) {
                res.status(401).json({'message': 'Упражнение уже существует'})
            } else {
                const exrciseNew = new Exercise(exrcise)
                await exrciseNew.save()
                res.status(201).json({'message': 'Упражнение сохранено'})
            }
        } catch (e) {
            res.status(500).json({'message': 'Что то пошло нетак'})
        }
    }
)

router.get(
    '/getExercise',
    async (req, res) => {
        try {
            const exercise = await Exercise.find()

            if (!exercise.length) {
                res.status(404).json({'message': 'Добавьте расписание'})
            } else {
                res.status(201).json({exercise})
            }
        } catch (e) {
            res.status(500).json({'message': 'Ошибка соединения с сервером'})
        }
    }
)

router.delete(
    '/deleteExercise',
    async (req, res) => {
        const exerciseId = req.query.exerciseId

        try {
            const candidate = await Exercise.findOne({_id: exerciseId})

            if (!candidate) {
                res.status(400).json({message: 'Упражнение не найдено'})
            } else {
                await Exercise.deleteOne({_id: exerciseId}).then(() => {
                    res.status(201).json({message: 'Упражнение удалено'})
                }).catch(err => {
                    res.status(400).json({message: err})
                })
            }
        } catch (e) {
            res.status(500).json({'message': 'Ошибка удаления'})
        }
    }
)

module.exports = router