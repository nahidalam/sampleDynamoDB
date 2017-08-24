$( document ).ready(function() {

	//var socket = io.connect('http://www.ciscochill.com:80');
	var socket = io.connect('http://localhost:8080');

	//read from database and create based on questions whose decision has been taken already
	var tableNameDecision = "Decision"
	var tableNameFollowup = "Followup"
	var selectOptions = [];
	var decisionArray = [];
	var qArray = [];
	var fArray = [];
	var doneStatus = [];

	$( '.followupText' ).hide();
	$( '.followupSteps' ).hide();
	$("#txtFollowup").hide();

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

			//show a text message
			$( '.followupText' ).show();

			//show the textbox to write followups
			$("#txtFollowup").show();

			//if there was a followup list before, show them
			$( '.followupSteps' ).show();
			//read the followup table of current question qArray[index-1]
			//if no followup, ask to create followup

			//once ENTER press, insert in followup table
			$('#txtFollowup').on('keydown',function(e){
  			if(e.which == '13'){
					//create params for inserting at Followup Table
					var qFolfowup = qArray[index-1];
					var dFollowup = decisionArray[index-1];
					var fFollowup = $("#txtFollowup").val();
					var doneFollowup = 0;

					var paramsInsertFollowup = {
					    TableName:tableNameFollowup,
					    Item:{
					        "question": qFollowup,
					        "info":{
					            "decision": dFollowup,
					            "followup": fFollowup,
											"done": doneFollowup
					        }
					    }
					};
    			//insert in the followup table, send socket message to server
					socket.emit('insertFollowup',paramsInsertFollowup);

					//show the followup entry below beside a checkbox - scan followupTable
					var paramsScanFollowup = {
					    TableName:tableNameFollowup
					};

					socket.emit('scanFollowup', paramsScanFollowup);

  			}
			});
			//scan followup table either way
			socket.emit('scanFollowup', paramsScanFollowup);
			//retrieve the followup entry
			socket.on('scanFollowupResults', function (results) {
				var objFollowup = JSON.parse(results);
				var count = Object.keys(objFollowup.Items).length;
				if(count >0){
					for (i=0; i<count; i++){
						fArray.push(objFollowup.Items[i].info.followup);
						doneStatus.push(objFollowup.Items[i].info.done);
					}
					//and show that followup entry below beside a checkbox

					for (i=0; i<count; i++){
						//unhide one checkbox and one label in each iteration
						//based on doneStatus show
						$("#labelFollowup").text(fArray[i]);
					}
				}
			});
		});

	})

	//checkbox click action
	//gray it out, update the done column of followup table


	/*$("#btnFollowupSubmit").click(function(){
		//gather all the data for the Followup Table, create a JSON and send it
		socket.emit('insertFollowup',tableJSON);
		console.log ("sent database insert request at Followup Table" + index);

	}) */

});
