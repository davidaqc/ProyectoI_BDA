const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const Mongoose = require('mongoose');
const corsMiddleware = require('./cors');
const cors = require('cors');

//Variables requeridas para el HTTPS
const fs = require('fs')
const https = require('https')
const path = require('path')
const directoryToServer = 'client'
const port = 5001

//Asignacion del express
const appi = express() 

//Definiciones para el CORS
appi.use(express.json({ limit: "100mb" }));
appi.options('*', corsMiddleware);
appi.use(corsMiddleware);
appi.use(cors());

//Importacion de Routes
const usersRoute = require('./routes/users')
const adminsRoute = require('./routes/admins')
const requestRoute = require('./routes/request')
//Uso de las Routes
appi.use('/users', usersRoute)
appi.use('/admins', adminsRoute)
appi.use('/request', requestRoute)
appi.use(bodyParser.json())

//Conexion a la base de datos de mongo
Mongoose.connect('mongodb://localhost:27017/dbProyecto1', { useNewUrlParser: true }, () => console.log('Conected to DataBase :D'), function (err, res) {
  if (err) {
    console.log("ERROR: Connecting to Database :c " + err);
  }
});

//codigo hhtps
https.createServer({
  cert: fs.readFileSync('./ssl/server.crt'),
  key: fs.readFileSync('./ssl/server.key')
}, appi).listen(port, function () {
  console.log(`Node server running on https://localhost:${port}`);
});

//GET
appi.get('/', async (req, res) => {
  try {
    res.json({A: "For users try ./users", B: "For admins try ./admins", C: "For request try ./request/#"});
  } catch (err) {
    res.json({ message: err })
  }
});


module.exports = appi