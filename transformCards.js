var fs = require('fs');

var obj;
fs.readFile('AllCards.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  console.log(obj["Air Elemental"]);

  var cards = "";
  var keys = Object.keys( obj );
  keys.sort();
  for( var i = 0,length = keys.length; i < length; i++ ) {
    cards += JSON.stringify(obj[ keys[ i ] ]) + "\n";
  }

  fs.writeFile('test.json', cards, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to test.json");
    }
  }); 
});

