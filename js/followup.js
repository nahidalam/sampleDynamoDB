$( document ).ready(function() {

	//var socket = io.connect('http://www.ciscochill.com:80');
	var socket = io.connect('http://localhost:8080');

	//read from database and create based on questions whose decision has been taken already
	var tableNameDecision = "Decision"
	var tableNameFollowup = "Followup"
	//var optionValues= [[1,"first"],[2,"second"]];
	var selectOptions = [];

  $("#populateMenu").click( function () {
				//create param for scanning the Decision Table
				var paramsScanDecision = {
				    TableName:tableNameDecision
				};
				//send socket msg to server
				socket.emit('scanDecision',paramsScanDecision);
			})

			socket.on('scanDecisionResults', function (results) {
				//receives the entire object from socket
				//parse JSON to only show the necessary items in this case

				var obj = JSON.parse(results);
				//from the parameters I passed, I already know which table I am reading
				//so parse the items accordingly
				var count = Object.keys(obj.Items).length;
				var qArray = [];
				var dArray = [];
				//var eArray = [];
				for (i=0; i<count; i++){
					qArray.push(obj.Items[i].question);
					dArray.push(obj.Items[i].info.decision);
					//eArray.push(obj.Items[i].info.email);
				}
				for (i=0;i<qArray.length; i++){
					console.log(qArray[i]);
					console.log(dArray[i]);
					//console.log(eArray[i]);
				}

				var options = '';
				for (var i=0;i<count;i++){
						selectOptions[i] = [];
						selectOptions[i][0] = qArray[i];
						options += '<option value="' + selectOptions[i][0]+ '">' + selectOptions[i][0] + '</option>';
				}
				$("#quesSelect").html(options);

	    });

	$("#quesSelect").click(function(){
		//what happens when question arrow drag&drop clicked?
		//reads all questions whose decision has been taken and shows them
		var currentValue = $("#quesSelect option:selected").val();
		console.log("selected option");
		console.log(currentValue);

	})
	/*$("#selectQuestion").click(function(){
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
