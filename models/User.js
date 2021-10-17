const mongoose = require('mongoose')

//Schema
const LibroSchema = mongoose.Schema({
    Mail: { type: 'string',  allowNull: false, unique: true},
    Password: { type: 'string', allowNull: false},
    Name: String,
    Lastname: String,
    Country:  String,
    UniversityDegrees: { type: JSON, allowNull: false},
    TI: { type: Boolean, allowNull: false},
    ProgrammingLenguages: { type: JSON },
    Languages: { type: JSON,  allowNull: false }
})

module.exports = mongoose.model('users', LibroSchema)