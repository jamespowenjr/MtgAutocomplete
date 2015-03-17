var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var collection;

MongoClient.connect('mongodb://localhost:27017/deckreg', function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  collection = db.collection('Cards');
});

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/cards', function (req, res, next) {
  console.log(req.query.term);
  collection.find({'name':new RegExp('^' + req.query.term + '.*', "i")}).toArray(function(err, card){
    //res.send(JSON.stringify(card));
    //res.send(card);

    var cards= new Array();
    var keys = Object.keys(card);
    for( var i = 0,length = keys.length; i < length; i++ ) {
      var cardName = card[ keys[ i ] ]['name'];
      //var card = new Object();
      //card['id'] = cardName;
      //card['value'] = cardName;
      //card['label'] = cardName;
      cards.push(cardName);
    }
    res.send(cards);
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
