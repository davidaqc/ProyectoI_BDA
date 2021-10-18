const User = require('../models/User');
const bcrypt = require('bcrypt');

//POST con contraseña encriptada
const register = (req, res) => {
    bcrypt.hash(req.body.Password, 10, function (err, hashPass) {
        if (err) {
            res.json({
                Error: err
            })
        }

        const user = new User({
            Mail: req.body.Mail,
            Password: hashPass,
            Name: req.body.Name,
            Lastname: req.body.Lastname,
            Country: req.body.Country,
            UniversityDegrees: req.body.UniversityDegrees,
            TI: req.body.TI,
            ProgrammingLenguages: req.body.ProgrammingLenguages,
            Languages: req.body.Languages
        })
        user
            .save()
            .then(result => { res.json({ message: "Handling POST request to /users", createdUser: user }) })
            .catch(err => console.log(err))

        console.log(req.body)
    })
}

//POST login
const login = (req, res) => {

    User.findOne({ Mail: req.body.Mail })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.Password, user.Password, function(err, result){
                    if(err){
                        return res.status(500).json({Error: err});
                    }
                    if (result) {
                        return res.status(200).json({message: 'Login Successful!'});
                    } else {
                        return res.status(400).json({message: 'Password does not match!'});
                    }
                })
            } else {
                return res.status(400).json({message: 'No user found!'});
            }
        })
}

module.exports = {
    register,
    login
}