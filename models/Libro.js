const mongoose = require('mongoose')

//Schema
const LibroSchema = mongoose.Schema({
    Name: String,
    Author: String,
    UserRating: Number,
    Reviews:  Number,
    Price: Number,
    Year: Number,
    Genre: String
})

module.exports = mongoose.model('libros', LibroSchema)


