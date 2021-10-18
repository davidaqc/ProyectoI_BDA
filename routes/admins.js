const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

const router = express.Router();

//POST login
router.post('/', async (req, res) => {  
  Admin.findOne({ Mail: req.body.Mail })
  .then(admin => {
      if (admin) {
          bcrypt.compare(req.body.Password, admin.Password, function(err, result){
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
          return res.status(400).json({message: 'No admin found!'});
      }
  })
});

//POST con contraseña encriptada
router.post('/register', async (req, res) => {
  bcrypt.hash(req.body.Password, 10, function (err, hashPass) {
      if (err) {
          res.json({
              Error: err
          })
      }

      const admin = new Admin({
          Mail: req.body.Mail,
          Password: hashPass
      })
      admin
          .save()
          .then(result => { res.json({ message: "Handling POST request to /admins/register", createdUser: admin }) })
          .catch(err => console.log(err))

      console.log(req.body)
  })
});


module.exports = router
