const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')

const PORT = process.env.PORT || 8080
const app = express()

module.exports = app

const createApp = () => {
    // logging middleware
    app.use(morgan('dev'))

    // body parsing middleware
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    // compression middleware
    app.use(compression())

    // api route
    app.use('/api', require('./api/router'))

    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '../..', 'build')))

    // handle 404
    app.use((req, res, next) => {
        if (path.extname(req.path).length){
            const err = new Error('Not found')
            err.status = 404
            next(err)
        } else {
            next()
        }
    })

    // error handle endware
    app.use((err, req, res, next) => {
        console.error(err)
        console.error(err.stack)
        res.status(err.status || 500).send(err.message || 'Intenal server error.')
    })
}


const startListening = () => {
    app.listen(PORT, () => {
        console.log(`Server start listening on port ${PORT}`)
    })
}

async function bootApp() {
    await createApp()
    await startListening()
  }

if (require.main === module) {
    bootApp()
  } else {
    createApp()
  }