const mongoose = require('mongoose')

//Schema
const UserSchema = mongoose.Schema({
    Mail: { type: 'string',  allowNull: false, unique: true},
    Password: { type: 'string', allowNull: false},
    Name: String,
    Lastname: String,
    Country:  String,
    UniversityDegrees: { type: JSON, allowNull: false},
    TI: { type: String, allowNull: false},
    ProgrammingLenguages: { type: JSON },
    Languages: { type: JSON,  allowNull: false }
})

module.exports = mongoose.model('users', UserSchema)