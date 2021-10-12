const express = require('express')
const router = express.Router()
const  Libro = require('../models/Libro')


// GET
router.get('/', async (req, res) => {
  //res.send("We are on post") 
  try{
      const post = await Libro.find();
      res.json(post)

  }catch(err){
     res.json({message:err})   
  }
})


//POST
router.post('/', async (req, res) => {
    console.log(req.body);
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
    const savePost = await post.save();
      res.json(savePost) ;
    }catch(err){
        res.json({message: err});
    }
})

 //GET de ID especifico
 router.get('/:postId', async (req, res) => {
    try{
        const post = await Libro.findById(req.params.postId)
        res.json(post)
  
    }catch(err){
       res.json({message:err})   
    }
  })  

  //DELETE POR ID
  router.delete("/:postId", (req, res, next) => {
    const id = req.params.postId;
    Libro.deleteOne({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result);
      })
      .catch(err =>{
         console.log(err)
         res.status(500).json({
           erros: err
         }) 
    })  
  })
 
  
  router.patch("/:postId", async (req, res) =>{
    try{
       const id = req.params.postId;
       const updates =  req.body;
       console.log(req.body);
       const options = {new: true};
       const result = await Libro.updateOne({_id:id}, updates , options);
       res.send(result);
    }catch (error){
      console.log(error.message);
    } 
  })
  

  /*
  router.patch("/:postId", (req, res) => {
    res.status(200).json({
      status = "success",
      data: {
          Libro : '<Update Libro here..>'
      }  
    })
    })
*/

  
  
  //UPDATE
  router.patch("/:postId", (req, res, next) =>{
    const id = req.params.postId;
    const updateOps = {};
    for(const ops in req.body){
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



router.patch('/:postId', async (req, res) => {
  try {
      const updatedLibro = await Libro.updateOne(
        {_id: req.params.postId},
        {$set: {Name: req.body.Name}}
      );
      res.json(updatedLibro);
  }  catch(err){
    res.json({message:err});
  }
})



  
module.exports = router

