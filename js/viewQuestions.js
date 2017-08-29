$(document).ready(function(){

var socket = io.connect('http://localhost:8080');
var whoSendsQuestion = "nahalam@cisco.com";

var tableNameQuestion = "Question"
var txtQuestionData;
var txtParticipantEmailData;
var ansTypeQuestion;

var selectOptions = [];
var qArray = [];
var ansTypeArray = [];
var participantEmailArray = [];
var index;

console.log("1st load");
});
