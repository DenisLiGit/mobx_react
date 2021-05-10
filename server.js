const express = require("express")
const path = require('path');
const config = require('config')
const mongoose = require('mongoose')

const server = express()
const port = process.env.PORT || config.get('port');

if (process.env.NODE_ENV === 'production') {
    server.use(express.static(path.resolve(process.cwd(), 'client/build')))
    server.get('*', (req, res) => {
        res.sendFile(path.resolve(process.cwd(), 'client/build/index.html'))
    })
}

server.use(express.json({extended: true}))

server.use('/api/auth', require('./routes/auth.routes'))
server.use('/api/exercise', require('./routes/exercise.routes'))
server.use('/api/workout', require('./routes/workout.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        server.listen(port, () => {
            console.log(`server started on port ${port}`)
        })
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start()