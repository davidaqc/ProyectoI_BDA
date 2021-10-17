const express = require('express');
const User = require('../models/User');

const router = express.Router();

// GET
router.get('/', async (req, res) => {
  try {
    const answer = await User.find();
    res.json(answer)

  } catch (err) {
    res.json({ message: err })
  }
});

//GET de ID especifico
router.get('/:Mail', async (req, res) => {
  try {
    const mail = req.params.Mail;
    const answer = await User.findOne({Mail: mail})
    res.json(answer)

  } catch (err) {
    res.json({ message: err })
  }
});

//POST
router.post('/', (req, res) => {
  console.log(req.body);
  const user = new User({
    Mail: req.body.Mail,
    Password: req.body.Password,
    Name: req.body.Name,
    Lastname: req.body.Lastname,
    Country: req.body.Country,
    UniversityDegrees: req.body.UniversityDegrees,
    TI: req.body.TI,
    ProgrammingLenguages: req.body.ProgrammingLenguages,
    Languages: req.body.Languages
  });
  user
    .save()
    .then(result => { console.log(result); })
    .catch(err => console.log(err));
  res.status(201).json({
    message: "Handling POST request to /users", createdUser: user
  });
});

//DELETE POR ID
router.delete("/:Mail", (req, res, next) => {
  const mail = req.params.Mail;
  User.deleteOne({ Mail: mail })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        erros: err
      })
    })
});

//PATCH POR ID
router.patch('/:Mail', async (req, res) => {
  try {
    const updateOps = {
        Country: req.body.Country,
        UniversityDegrees: req.body.UniversityDegrees,
        ProgrammingLenguages: req.body.ProgrammingLenguages,
        Languages: req.body.Languages
    };

    const updatedUser = await User.updateOne(
      { Mail: req.params.Mail }, { $set: updateOps });
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});


module.exports = router
