$( document ).ready(function() {

	//var socket = io.connect('http://www.ciscochill.com:80');
	var socket = io.connect('http://localhost:8080');

	var tableNameDecision = "Decision"
	var fields = ['a','b','c'];
	var data = ['p', 'q', 'r'];
	var who = ['x', 'y', 'z'];



	$(function() {
    var table = $("#resultTable");
    var rowNum = 3;
    var resultHtml = '';

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

	table.html(resultHtml);
    return false;
});

});
