const express = require('express');
const User = require('../models/User');

const router = express.Router();

//GET Consulta1
//Mostrar el nombre completo de las personas que son del área de TI
router.get('/1', async (req, res) => {
    try {
        const answer = await User.find({ TI: "Yes" });
        var list = new Array;

        answer.forEach(element => {
            list.push({
                Name: element.Name,
                Lastname: element.Lastname
            })
        });

        res.json(list);

    } catch (err) {
        res.json({ message: err })
    }
});

//GET Consulta2
//Mostrar el nombre completo y país de residencia de las personas que hablan inglés avanzado
router.get('/2', async (req, res) => {
    try {
        const answer = await User.find({Languages: {Language:"Ingles", Level: "Avanzado"}});
        var list = new Array;

        answer.forEach(element => {
            list.push({
                Name: element.Name,
                Lastname: element.Lastname,
                Country: element.Country
            })
        });

        res.json(list);

    } catch (err) {
        res.json({ message: err })
    }
});

//GET Consulta3
//Mostrar el nombre completo, títulos de las personas que no son del área de TI.
router.get('/3', async (req, res) => {
    try {
        const answer = await User.find({TI: "No"});
        var list = new Array;

        answer.forEach(element => {
            list.push({
                Name: element.Name,
                Lastname: element.Lastname,
                UniversityDegrees: element.UniversityDegrees
            })
        });

        res.json(list);

    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router