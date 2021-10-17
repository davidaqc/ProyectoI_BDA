var ottoman = require("ottoman");

ottoman.bucket =  require("./app").bucket;

var PersonalModel = ottoman.model("Person", {
  timestamp: {
    type:"Date",
    default: function(){return new Date();}
  },
  name: {
    first:"String",
    last:"String"
  },
  email:"Sting",
  comments:[
    {
      ref:"Comment"
    }
  ]
});

var CommentModel = ottoman.model("Comment", {
  timestamp:{
    type:"Date",
    default:function(){return new Date();}
  },
  message:"String"
});

module.exports.PersonalModel = PersonalModel;
module.exports.CommentModel = CommentModel;
