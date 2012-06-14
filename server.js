var express = require("express"),
    app     = express.createServer();

var Pusher = require('node-pusher');

var pusher = new Pusher({
  appId: '22311',
  key: '7227171dc0a29651a3a4',
  secret: '5945e0de13942cf3fb6a'
});


app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(express.bodyParser());
});

app.get("/", function(request, response) {
  response.redirect("/index.html");
});

app.post('/post', function(request, response) {
  var data = request.body;

  pusher.trigger('my-channel', 'my-event', data, '1302.1081607', function(err, req, res) {
    response.send(200);
  });
});


var port = process.env.PORT || 3000;
console.log("Listening on " + port);
app.listen(port);