const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const  Libro = require('./models/Libro')
const  Mongoose  = require('mongoose');
const corsMiddleware = require ('./cors');


const appi = express()
/* try 1
// Configurar cabeceras y cors
appi.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
*/

/*try 2
appi.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
*/

appi.use(express.json({limit: "100mb"}));

/*try 3*/
appi.options('*', corsMiddleware);
appi.use(corsMiddleware);

//Import Routes
const librosRoute = require('./routes/libros')

appi.use('/libros', librosRoute)
appi.use(bodyParser.json())

//CONEXION BASE
Mongoose.connect('mongodb://localhost:27017/dbAmazon', {useNewUrlParser: true}, () => console.log('Conected to DataBase :D'), function(err,res){
    if(err){
    console.log("ERROR: Connecting to Database :c " + err);
    }
});

//Listener to the server
appi.listen(5001, function(){
  console.log("Node server running on https://localhost:5001");
});


//ROUTES
appi.get('/',async (req,res) => {
  try{
    res.json("For libros try ./libros");
}catch(err){
   res.json({message:err})   
}
}); 


module.exports = appi