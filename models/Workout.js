const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    exerciseId: [{type: String}]
})

module.exports = model('Workout', schema)