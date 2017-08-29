$( document ).ready(function() {

	var socket = io.connect('http://localhost:8080');

	var tableNameDecision = "Decision"
	var decisionArray = [];
	var qArray = [];
	var whoArray = [];
	var len;


	$('#view_question').click(function() {
		window.location.href = "/view_questions.html"
	})

	$('#new_question').click(function() {
		 window.location.href = "/new_questions.html"
	 })

	 $('#view_decision').click(function() {
		 window.location.href = "/decisions.html"
	 })
	 $('#create_followup').click(function() {
		 window.location.href = "/followup.html"
	 })

	var paramsScanDecision = {
			TableName:tableNameDecision
	};
	//send socket msg to server
	socket.emit('scanDecision',paramsScanDecision);

	socket.on('scanDecisionResults', function (results) {
		console.log("captured scan decision results");
		var obj = JSON.parse(results);
		len = Object.keys(obj.Items).length;
		console.log("len is");
		console.log(len);
		for (i=0; i<len; i++){
			qArray.push(obj.Items[i].question);
			decisionArray.push(obj.Items[i].info.decision);
			whoArray.push(obj.Items[i].info.email);
		}

		$(function() {
	    var table = $("#resultTable");
	    var rowNum = 3;
	    var resultHtml = '';
			console.log ("inside function len is");
			console.log(len);

		for(var i = 0 ; i < len ; i++) {
			resultHtml += ["<tr>",
		 "<td>",
		  qArray[i],
		 "</td>",
		 "<td>",
		  decisionArray[i],
		 "</td>",
		 "<td>",
		  whoArray[i],
		 "</td>",
		 '</tr>'].join("\n");
		}
		table.append(resultHtml);
	    return false;
	});
	});

});
