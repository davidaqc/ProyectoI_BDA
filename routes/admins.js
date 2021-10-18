const express = require('express');
const Admin = require('../models/Admin');

const router = express.Router();

//GET de ID especifico
router.get('/:Mail', async (req, res) => {
  try {
    const mail = req.params.Mail;
    const answer = await Admin.findOne({Mail: mail})
    res.json(answer)

  } catch (err) {
    res.json({ message: err })
  }
});

module.exports = router
