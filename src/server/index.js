import express from 'express'
import { serverPort } from '../../config'

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.listen(serverPort, () =>
    console.log(`Started express server on port ${serverPort}`)
)
