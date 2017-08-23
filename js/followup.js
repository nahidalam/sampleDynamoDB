$( document ).ready(function() {

	//var socket = io.connect('http://www.ciscochill.com:80');
	var socket = io.connect('http://localhost:8080');

	//read from database and create based on questions whose decision has been taken already
	var tableNameDecision = "Decision"
	var tableNameFollowup = "Followup"
	var selectOptions = [];
	var decisionArray = [];
	var qArray = [];

	$( '.followupText' ).hide();
	$( '.followupSteps' ).hide();

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
				//var qArray = [];
				for (i=0; i<count; i++){
					qArray.push(obj.Items[i].question);
					decisionArray.push(obj.Items[i].info.decision);
				}

				var options = '';
				for (var i=0;i<=count;i++){
						selectOptions[i] = [];
				}
				selectOptions[0][0] = "Selct a Question";
				for (var j=1;j<=count;j++){
						selectOptions[j][0] = qArray[j-1];
					}
				for (var i=0;i<=count;i++){
						options += '<option value="' + selectOptions[i][0]+ '">' + selectOptions[i][0] + '</option>';
				}
				$("#quesSelect").html(options);

	    });

	$("#quesSelect").click(function(){
		$('select').change(function(){
			var index = $('option:selected',this).index();
			//you know the index now, show the decision
			$('.decision').html(decisionArray[index-1]);

			//create a div for writing followups and
			$( '.followupText' ).show();
			//if there was a followup list before, show them

			//read the followup table of current question qArray[index-1]
			//if no followup, ask to create followup
			$( '.followupSteps' ).show();
			//show a textbox where u can enter followup.
			//once ENTER press, insert in followup table
			//and show that followup entry below beside a checkbox
			//each line of the followup is a text with checkbox when you start typing
		});

	})

	//checkbox click action - gray it out


	/*$("#btnFollowupSubmit").click(function(){
		//gather all the data for the Followup Table, create a JSON and send it
		socket.emit('insertFollowup',tableJSON);
		console.log ("sent database insert request at Followup Table" + index);

	}) */

});
