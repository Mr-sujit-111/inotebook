const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/records?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connection = () => {
    mongoose.connect(mongoURL, () => {
        console.log('connection success');
    })
}

module.exports = connection;