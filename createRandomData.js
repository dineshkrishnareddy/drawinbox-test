var mongoose = require('mongoose');
var db = require('./src/server/model/employee.js');

mongoose.connect('mongodb://localhost:27017/drawinbox');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomExperience() {
   var expYear = getRandomInt(0, 20),expMonth;

    if (expYear === 0) {
        expMonth = getRandomInt(1, 11);
    } else {
        expMonth = getRandomInt(0, 11);
    }

   return expYear + (expMonth * 0.1);
}

function createRandomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var numTestDocs = 5000;
for(var i = 0; i < numTestDocs; i++) {
   var item = new db.employeeModel({
      name: "user-"+i,
      experience: createRandomExperience(),
      salary: getRandomInt(0, 1000000)
   });
   item.save(function(err, doc) {
      // do error handling if you want to
      console.log('Test Record Saved with id: ' + doc._id);
   });
}