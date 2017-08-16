$( document ).ready(function() {

	//var socket = io.connect('http://www.ciscochill.com:80');
	var socket = io.connect('http://localhost:8080');
	//var socket = io();

	//read from database and create based on questions whose decision has been taken already
	var optionValues= [[1,"first"],[2,"second"]];

  $("#populateMenu").click( function () {
        for (var i=0;i<optionValues.length;i++){
            $('#quesSelect').append(("<option></option>").val(optionValues[i][0]).text(optionValues[i][1]))
        }
			})

	/*$("#select").click(function(){
		//what happens when question arrow drag&drop clicked?
		//reads all questions whose decision has been taken and shows them

	})
	$("#selectQuestion").click(function(){
		//what happens when one of the questions is selected
		//reads its decision from decision table and shows in a div
		//also creates a space for followup writing

	})


	$("#btnFollowupSubmit").click(function(){
		//gather all the data for the Followup Table, create a JSON and send it
		socket.emit('insertFollowup',tableJSON);
		console.log ("sent database insert request at Followup Table" + index);

	}) */

});
