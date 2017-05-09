var express=require('express'),
    app=express(),
    mongoose = require('mongoose');


app.use(express.static(__dirname + '/src'));
require("./src/server/router/router.js")(app);


//mongoose.connect("mongodb://dinesh:dinesh@ds055574.mlab.com:55574/sample");

mongoose.connect('mongodb://localhost:27017/drawinbox');

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
    console.log('Could not connect to mongo server!');
    console.log(err);
});


// set our port
var port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log('App is running on port ' + port);
});
