var PersonalModel = require("./models").PersonalModel;
var CommentModel = require("./models").CommentModel;


var appRoutes = function(app){

  app.get("/person", function(req,res){
    PersonalModel.find({}, function(error, people))
    if(error){
      return res.status(400).send(error);
    }
    res.send(people);
  });
});

  app.get("/person/:id", function(req,res){

  });

  app.post("/person", function(req,res){
    var person = new PersonalModel({
      name:{
        firts: req.body.name.firts,
        last: req.body.name.last,
      },
      email: req.body.email
    });
      person.save(function(error, result){
        if(error){
          return res.status(400).send(error);
        }
        res.send(result);
      });
  });

  app.post("/comment", function(req,res){

  });
}

module.exports = appRouter;
