var express = require ("express");
var couchbase = require("couchbase");
var bodyParser = require("body-parser");
var ottoman = require("ottoman");
var cluster = new couchbase.Cluster();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var cluster = new couchbase.Cluster("couchbase://localhost");
 cluster.authenticate({user:'admin'}, {password: 'admin'});
var bucket = cluster.openBucket("prueba");
module.exports.bucket = bucket;

var routes = requiere("./routes.js")(app);

ottoman.bucket = bucket;

ottoman.ensureIndices(function(error){
  if(error){
    console.log(error);
  }
  var server = app.listen(3000, function(){
    console.log("Listening on port %s...", server.address().port);
  });
})
