const express = require('express');
const bodyParser = require('body-parser')
const appi = express()
const router = express.Router()
const  Libro = require('./models/Libro')
const  Mongoose  = require('mongoose');


//Import Routes
const postRoute = require('./routes/post')

appi.use('/post', postRoute)
appi.use(bodyParser.json())

//ROUTES
appi.get('/',async (req,res) => {
  try{
    const post = await Libro.find();
    res.json(post)
}catch(err){
   res.json({message:err})   sds
}
}); 

//POST
appi.post('/', async (req, res) => {
  console.log(req.body)
  const post = new Libro({
      Name: req.body.Name,
      Author: req.body.Author,
      UserRating: req.body.UserRating,
      Reviews: req.body.Reviews,
      Price: req.body.Price,
      Year: req.body.Year,
      Genre: req.body.Genre
  })
  try{ 
  const savePost = await post.save()
    res.json(savePost)   
  }catch(err){
      res.json({message: err})
  }
})

router.patch("/:postId", (req, res, next) =>{
  const id = req.params.postId;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;  
  }
  Libro.updateOne({_id: id}, {$set: updateOps}) 
  .exec()
  .then(result => {
    console.log(result)
    res.status(200).json(result)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
})

//CONEXION BASE
Mongoose.connect('mongodb://localhost:27017/dbAmazon', {useNewUrlParser: true}, () => console.log('Conected to DataBase :D'), function(err,res){
    if(err){
    console.log("ERROR: Connecting to Database :c " + err);
    }
});


//Listener to the server

//Listener to the server
appi.listen(5001, function(){
  console.log("Node server running on http://localhost:3000");
});
module.exports = appi
