var currentCard = 1;

function nextCard() {
  if (currentCard == 3)
    currentCard = 1;
  else
    currentCard = currentCard + 1;
  
  $.ajax({
    type: 'POST',
    url: '/next',
    data: {
      card: 'card' + currentCard
    }
  });
}

function playCard(type, card) {
  $.ajax({
    type: 'POST',
    url: '/post',
    data: {
      card: card,
      type: type
    }
  });
}

Pusher.log = function(message) {
  if (window.console && window.console.log) window.console.log(message);
};
WEB_SOCKET_DEBUG = true;

var pusher = new Pusher('7227171dc0a29651a3a4');
var channel = pusher.subscribe('my-channel');

channel.bind('my-event', function(data) {
  $("h1#winner").text(data.winner);
  $.mobile.changePage("#dialog");
});


channel.bind('nextcard', function(data) {
  $.mobile.changePage("#" + data.card);
});