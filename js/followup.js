$( document ).ready(function() {

	//var socket = io.connect('http://www.ciscochill.com:80');
	var socket = io.connect('http://localhost:8080');
	console.log (socket);
	socket.emit("reset","all");

	var mySwiper = new Swiper ('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      freeModeMomentum: true
    })

	$("#select").click(function(){

	//turn of card select
	mySwiper.lockSwipes();

	//turn it back on, if needed.
	//mySwiper.unlockSwipes()

	//This always holds the index of the current card.
	//console.log(mySwiper.realIndex);

	document.getElementById("btnLocal").style.display="inline-block";
	document.getElementById("btnDist").style.display="inline-block";
	document.getElementById("btnGT").style.display="inline-block";
	document.getElementById("select").style.display="none";

	})

	$("#btnLocal").click(function(){
		document.getElementById("btnLocal").style.display="none";;
		document.getElementById("btnDist").style.display="none";
		document.getElementById("btnGT").style.display = "none";
		document.getElementById("select").style.display="none";
		document.getElementById("btnReSelectLocal").style.display="inline-block";
		document.getElementById("btnReSelectDist").style.display="none";
		document.getElementById("btnReSelectGT").style.display="none";

	})

	$("#btnDist").click(function(){

		document.getElementById("btnLocal").style.display="none";;
		document.getElementById("btnDist").style.display="none";
		document.getElementById("btnGT").style.display = "none";
		document.getElementById("select").style.display="none";
		document.getElementById("btnReSelectLocal").style.display="none";
		document.getElementById("btnReSelectDist").style.display="inline-block";
		document.getElementById("btnReSelectGT").style.display="none";
		//socket.emit('card',mySwiper.realIndex);
		var index = mySwiper.realIndex;
		//var index = 1;
		//socket.emit('message',index);
		socket.emit('card',index);
		console.log ("sent card index:" + index);

	})
	$("#btnGT").click(function(){

		console.log ("Hybrid Selected");
		document.getElementById("btnLocal").style.display="none";
		document.getElementById("btnDist").style.display="none";
		document.getElementById("btnGT").style.display = "none";
		document.getElementById("select").style.display="none";
		document.getElementById("btnReSelectLocal").style.display="none";
		document.getElementById("btnReSelectDist").style.display="none";

		/*$(".button").fadeOut('fast',function(){
			$("#btnReSelectGT").fadeIn();
		});*/

		document.getElementById("btnReSelectGT").style.display="inline-block";
		socket.emit('finger','ABC');
		console.log ("finger sent");

		//show card and ABC.png here


		/*$( "#content").animate({
    width: "50%"
  	}, 5000, function() {
    // Animation complete.
  });*/
	//.swiper-container

	$( ".cardimage").animate({
	//width: "50%"
	height: "50%"
	//left: "-=10%"
}, 3000, function() {
	// Animation complete.
	//$("#fingerprint").fadeIn(3000);
	var image = $("#fingerprint");
	//image.attr('left', '400');
	image.fadeIn('fast');
	//image.attr('src', '/img/ABC.jpg');
	//image.attr('height', '726');
	//image.attr('width', '500');
	//image.fadeIn('fast');

	/*image.fadeOut('fast', function () {
			image.attr('src', '/img/ABC.jpg');
			image.attr('height', '726');
			image.attr('width', '500');
			image.fadeIn('fast');
	});*/
});
	})

	$("#btnReSelectLocal").click(function(){

		console.log("Local Reselected");
		mySwiper.unlockSwipes();
		document.getElementById("btnReSelectLocal").style.display="none";
	})
	$("#btnReSelectDist").click(function(){
		console.log("Distributed reselected");
		socket.emit('flash',"flashing");
		document.getElementById("btnReSelectDist").style.display="none";
	})
	$("#btnReSelectGT").click(function(){
		mySwiper.unlockSwipes();
		var image = $("#fingerprintXYZ");
		//image.attr('src', '/img/XYZ.jpg');
		image.fadeIn('fast');
		console.log("Hybrid reselected");
		socket.emit('flash',"flashing");
		//data and signature will change here
		document.getElementById("btnReSelectGT").style.display="none";
	})

});
