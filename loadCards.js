var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/deckreg';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  var obj;
  fs.readFile('cards.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj["Air Elemental"]);

    var collection = db.collection('Cards');

    collection.insert(obj["Air Elemental"], function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      assert.equal(1, result.ops.length);
      console.log("Inserted 1 documents into the document collection");
    });

  });

//  db.close();
});

