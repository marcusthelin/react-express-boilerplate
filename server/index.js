import express from 'express'
import { serverPort } from '../config'

const app = express()

export default () =>
    new Promise(resolve => {
        // Business logic and middlewares goes here
        app.get('/', (req, res) => {
            res.send('<h1>Hello World!</h1>')
        })

        app.listen(serverPort, () =>
            resolve(`Started express server on port ${serverPort}`)
        )
    })
