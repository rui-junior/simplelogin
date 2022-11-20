
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors({

    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true

}))

const cookieparser = require('cookie-parser')
app.use(cookieparser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const routes = require('./src/models/routes')
app.use(routes)

try {
    
    app.listen(8000)
    console.log('Servidor on')
    const connection = require('./src/database/connection')

} catch (error) {
    
    console.log(error)

}