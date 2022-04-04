const connection = require('./db.js');
const express = require('express')

connection();
const app = express()
const port = 5000

// for send data in mongoDB in json formate
app.use(express.json())

// ______Routes_______ //
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})