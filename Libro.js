const mongoose = require('mongoose')

//Schema
const PostSchema = mongoose.Schema({
    Name: {
        type: String,
        required: false
    },
    Author: {
        type: String,
        required: false
    },
    UserRating: {
        type:  Number,
        required: false
    },
    Reviews: {
        type:  Number,
        required: false
    },
    Price: {
        type:  Number,
        required: false
    },
    Year: {
        type:  Number,
        required: false
    },
    Genre: {
        type: String,
        required: false
    }
})


module.exports = mongoose.model('libros', PostSchema)


