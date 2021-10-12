const express = require('express');
const Libro = require('../models/Libro');

const router = express.Router();

// GET
router.get('/', async (req, res) => {
  //res.send("We are on post") 
  try{
      const answer = await Libro.find();
      res.json(answer)

  }catch(err){
     res.json({message:err})   
  }
});

 //GET de ID especifico
 router.get('/:libroID', async (req, res) => {
  try{
      const answer = await Libro.findById(req.params.libroID)
      res.json(answer)

  }catch(err){
     res.json({message:err})   
  }
});

//POST
router.post('/', (req, res) => {
    console.log(req.body);
    const libro = new Libro({
        Name: req.body.Name,
        Author: req.body.Author,
        UserRating: req.body.UserRating,
        Reviews: req.body.Reviews,
        Price: req.body.Price,
        Year: req.body.Year,
        Genre: req.body.Genre
    });
    libro
      .save()
      .then(result => {console.log(result);})
      .catch(err => console.log(err));
    res.status(201).json({
      message: "Handling POST request to /libros", createdLibro: libro
    });
});

  //DELETE POR ID
  router.delete("/:libroID", (req, res, next) => {
    const id = req.params.libroID;
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
  });

  router.patch('/:libroID', async (req, res) => {
    try {
        const updateOps = {
          Name: req.body.Name,
          Author: req.body.Author,
          UserRating: req.body.UserRating,
          Rewiews: req.body.Rewiews,
          Price: req.body.Price,
          Year: req.body.Year,
          Genre: req.body.Genre
        };

        const updatedLibro = await Libro.updateOne(
          {_id: req.params.libroID}, {$set:updateOps});
        res.json(updatedLibro);
    }  catch(err){
      res.json({message:err});
    }
  });
  
  
module.exports = router

