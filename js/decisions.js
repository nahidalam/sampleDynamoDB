$( document ).ready(function() {

	//var socket = io.connect('http://www.ciscochill.com:80');
	var socket = io.connect('http://localhost:8080');

  socket.on('card', function (message) {

    var image = $("#img");
		console.log("received card");

    image.fadeOut('fast', function () {
			if (message == 0 ){
        image.attr('src', '/img/cards/ace_of_spades.png');
			}
			else if (message == 1 ){
        image.attr('src', '/img/cards/king_of_spades2.png');
			}
			else if (message == 2 ){
        image.attr('src', '/img/cards/queen_of_spades2.png');
			}
			else if (message == 3 ){
        image.attr('src', '/img/cards/jack_of_spades2.png');
			}
			else if (message == 4 ){
        image.attr('src', '/img/cards/10_of_spades.png');
			}
        image.fadeIn('fast');
    });
  });

  socket.on('finger', function (message) {
    var image = $("#img");

    image.fadeOut('fast', function () {
				image.attr('src', '/img/ABC.jpg');
        image.fadeIn('fast');
    });
  });

  socket.on('flash', function (message) {
		console.log("received flash");
    $("#alarm").fadeIn(3000);
    $("#alarm").fadeOut(2000);
  });

	socket.on('reset', function (message) {
			//clear up the page
			console.log("received reset reply");
			$("#img").hide();
  });

});
