const connection = require('./db.js');
const express = require('express');
const cors = require('cors');

// for handling CoRS origin Issue//
const app = express()
app.use(cors());

connection();
const port = 5000

app.use('/profile', express.static('upload/images'));
// for send data in mongoDB in json formate
app.use(express.json())


// ______Routes_______ //
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})