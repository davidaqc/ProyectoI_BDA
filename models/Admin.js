const mongoose = require('mongoose')

//Schema
const AdminSchema = mongoose.Schema({
    Mail: { type: 'string',  allowNull: false, unique: true},
    Password: { type: 'string', allowNull: false}
})

module.exports = mongoose.model('admins', AdminSchema)