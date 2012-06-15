var express = require("express"),
    app     = express.createServer();

var Pusher = require('node-pusher');

var pusher = new Pusher({
  appId: '22311',
  key: '7227171dc0a29651a3a4',
  secret: '5945e0de13942cf3fb6a'
});

function getWinner(card, type) {
  compare1 = eval("database.client1." + card + "." + type);
  compare2 = eval("database.client2." + card + "." + type);
  
  if (compare1 > compare2)
    return 'Player 1';
  else
    return 'Player 2';
}

var database = {
  client1: {
    card1: {
      ingredients: 1,
      fat: 2,
      calories: 3,
      cookingtime: 4
    },
    card2: {
      ingredients: 1,
      fat: 2,
      calories: 3,
      cookingtime: 4
    },
    card3: {
      ingredients: 1,
      fat: 2,
      calories: 3,
      cookingtime: 4
    }
  },
  client2: {
    card1: {
      ingredients: 4,
      fat: 3,
      calories: 2,
      cookingtime: 1
    },
    card2: {
      ingredients: 4,
      fat: 3,
      calories: 2,
      cookingtime: 1
    },
    card3: {
      ingredients: 4,
      fat: 3,
      calories: 2,
      cookingtime: 1
    }
  }
}

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
  var winner = getWinner(data.card, data.type);
  
  var result = {
    winner: winner,
    type: data.type
  }

  pusher.trigger('my-channel', 'my-event', result, '1302.1081607', function(err, req, res) {
    response.send(200);
  });
});

app.post('/next', function(request, response) {
  var data = request.body;
  
  pusher.trigger('my-channel', 'nextcard', data, '1302.1081607', function(err, req, res) {
    response.send(200);
  });
});

var port = process.env.PORT || 3000;
console.log("Listening on " + port);
app.listen(port);