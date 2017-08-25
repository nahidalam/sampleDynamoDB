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
	var ftxtArray = [];
	var doneStatus = [];
	var index;
	var qFollfowup;
	var dFollowup;
	var fFollowup;
	var doneFollowup;
	var count;
	var followupResultString;

	$("#btnViewFollowup").hide();
	$( '.followupText' ).hide();
	$( '.followupNotFound' ).hide();
	$("#txtFollowup").hide();
	$("#btnInsertFollowup").hide();


	socket.on('scanDecisionResults', function (results) {
		console.log("captured scan decision results");
		var obj = JSON.parse(results);
		var len = Object.keys(obj.Items).length;
		console.log("len is");
		console.log(len);
		for (i=0; i<len; i++){
			qArray.push(obj.Items[i].question);
			decisionArray.push(obj.Items[i].info.decision);
		}

		var options = '';
		for (var i=0;i<=len;i++){
				selectOptions[i] = [];
		}
		selectOptions[0][0] = "Selct a Question";
		for (var j=1;j<=len;j++){
				selectOptions[j][0] = qArray[j-1];
			}
		for (var i=0;i<=len;i++){
				options += '<option value="' + selectOptions[i][0]+ '">' + selectOptions[i][0] + '</option>';
		}
		$("#quesSelect").html(options);
	});


	socket.on('readFollowupResults', function (results) {
		console.log("captured read followup result");
		console.log(results);
		var objFollowup = JSON.parse(results);
		if(results =="{}"){
			console.log("empty result");
			$(".followupNotFound").show();
			//show the textbox to write followups
			$("#txtFollowup").show();
			//once ENTER press, save followups in an array
			$('#txtFollowup').on('keydown',function(e){
				if(e.which == '13'){
					$("#btnInsertFollowup").show();
					//create an array of followups by reading textfield content
					var fdata = $("#txtFollowup").val();
					console.log("pushing follouwp");
					console.log(fdata);
					ftxtArray.push(fdata);
				}
			});
		}
		else {
			console.log("not empty");
			$(".followupNotFound").hide();
			//$("#txtFollowup").show();
			console.log(objFollowup.Item.info.followup);
			followupResultString = objFollowup.Item.info.followup;
			console.log(followupResultString);
			//show that followup entry below beside a checkbox
			var howManyFollowups = (followupResultString.match(/;/g) || []).length + 1;
			console.log(howManyFollowups);
			var fields = followupResultString.split(';');
			console.log(fields[0]);

			$(function(){
				$("#followupTable tr").remove();
  			for(var index=0; index<howManyFollowups; index++){
    			let div = '<div class ="followupSteps">'+
  				'<input type="checkbox" id="checkboxFollowup'+index+'">'+
  				'<label for="checkboxFollowup'+index+'" id="labelFollowup'+index+'">'+fields[index]+'</label>'+
  				'</div>';
      		$('table').append('<tr> <td>'+div+' </td> </tr>')
     		}
			});
		}
	});

  $( function () {
				//create param for scanning the Decision Table
				var paramsScanDecision = {
				    TableName:tableNameDecision
				};
				//send socket msg to server
				socket.emit('scanDecision',paramsScanDecision);
	 })
  /*$("#populateMenu").click( function () {
				//create param for scanning the Decision Table
				var paramsScanDecision = {
				    TableName:tableNameDecision
				};
				//send socket msg to server
				socket.emit('scanDecision',paramsScanDecision);
	 })*/


	$("#quesSelect").click(function(){
		$('select').change(function(){
			//hide the followup show table
			$("#followupTable tr").remove();
			index = $('option:selected',this).index();
			//you know the index now, show the decision
			$('.decision').html(decisionArray[index-1]);

			//show the clickable button to view followups
			$("#btnViewFollowup").show();

		});

	})

	$("#btnViewFollowup").click(function(){
		console.log("view followup button clicked");
		//read followup table
		var paramsReadFollowup = {
		    TableName: tableNameFollowup,
		    Key:{
		      "question": qArray[index-1]
		    }
		};

		socket.emit('readFollowup', paramsReadFollowup);
		console.log("sent readFollowup");
	})


	$("#btnInsertFollowup").click(function(){

		//create params for inserting at Followup Table
		qFollfowup = qArray[index-1];
		dFollowup = decisionArray[index-1];
		fFollowup = ftxtArray.join(';');
		doneFollowup = 0;

		console.log("followup string");
		console.log(fFollowup);

		var paramsInsertFollowup = {
				TableName:tableNameFollowup,
				Item:{
						"question": qFollfowup,
						"info":{
								"decision": dFollowup,
								"followup": fFollowup,
								"done": doneFollowup
						}
				}
		};
		//insert in the followup table, send socket message to server
		socket.emit('insertFollowup',paramsInsertFollowup);

	})
	//checkbox click action
	//gray it out, update the done column of followup table

});
