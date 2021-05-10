const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    area: {type: String},
    approach: {type: Number, required: true},
    repeat: {type: Number, required: true},
    imglink1: {type: String},
    imglink2: {type: String},
    imglink3: {type: String}
})

module.exports = model('Exercise', schema)