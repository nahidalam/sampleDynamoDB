$( document ).ready(function() {

	//var socket = io.connect('http://localhost:8080');
	//var socket = io();
	var socket = io.connect('http://localhost:4005');

	var tableNameDecision = "Decision"
	var decisionArray = [];
	var qArray = [];
	var whoArray = [];
	var fields = ['a','b','c'];
	var data = ['p', 'q', 'r'];
	var who = ['x', 'y', 'z'];
	var len;


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



	/*$(function() {
    var table = $("#resultTable");
    var rowNum = 3;
    var resultHtml = '';
		console.log ("inside function len is");
		console.log(len);

	for(var i = 0 ; i < rowNum ; i++) {
		resultHtml += ["<tr>",
	 "<td>",
	  fields[i],
	 "</td>",
	 "<td>",
	  data[i],
	 "</td>",
	 "<td>",
	  who[i],
	 "</td>",
	 '</tr>'].join("\n");
	}
	table.append(resultHtml);
    return false;
});*/

});
