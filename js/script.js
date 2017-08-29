
$(document).ready(function(){

var socket = io.connect('http://localhost:8080');
var whoSendsQuestion = "nahalam@cisco.com";

var tableNameQuestion = "Question"
var tableNameAnswer = "Answer"
var txtQuestionData;
var txtParticipantEmailData;
var ansTypeQuestion;

var selectOptions = [];
var qArray = [];
var ansTypeArray = [];
var participantEmailArray = [];
var index;


$("#buttonDiv").hide();
$("#textDiv").hide();

console.log("hello");

//all socket.on actions here


//actions for create questions
$("#btnInsertQues").click(function(){
  console.log("submit question button clicked");
  txtQuestionData = $("#txtQuestion").val();
  console.log(txtQuestionData);
  txtParticipantEmailData = $("#txtParticipantEmail").val();
  console.log(txtParticipantEmailData);
  /*$('#questionformtopID input').on('change', function() {
   ansTypeQuestion = $('input[name=questionType]:checked', '#questionformtopID').val();
   console.log("selected checkbox is");
   console.log(ansTypeQuestion);
});*/

  ansTypeQuestion = "text";
  console.log(ansTypeQuestion);
  var paramsInsertQuestion = {
      TableName:tableNameQuestion,
      Item:{
          "question": txtQuestionData,
          "email": whoSendsQuestion,
          "info":{
              "answerType": ansTypeQuestion,
              "participantEmail": txtParticipantEmailData
          }
      }
  };

  socket.emit('insertQuestion', paramsInsertQuestion);
  console.log("Inserted question");
})


//actions for view question page

//as soon as the view question page loads
//below will populate the questions

socket.on('scanQuestionResults', function (results) {
  console.log("captured scan question results");
  var obj = JSON.parse(results);
  var len = Object.keys(obj.Items).length;
  console.log("len is");
  console.log(len);
  for (i=0; i<len; i++){
    qArray.push(obj.Items[i].question);
    ansTypeArray.push(obj.Items[i].info.answerType);
    participantEmailArray.push(obj.Items[i].info.participantEmail);

    console.log(qArray);
    console.log(ansTypeArray);
    console.log(participantEmailArray);

    //participantEmail column can contain multiple emails, comma seperated.
    //to make it scalable, we should search the participantEmail column results
    //with the current email I am looged into.
    //when login is implemented, do the scalable version

    //for now, participantEmail column has only one email for the PoC
  }

  var options = '';
  for (var i=0;i<=len;i++){
      selectOptions[i] = [];
  }
  selectOptions[0][0] = "Selct a Question";
  for (var j=1;j<=len;j++){
      selectOptions[j][0] = qArray[j-1];
      console.log(selectOptions[j][0]);
    }
  for (var i=0;i<=len;i++){
      options += '<option value="' + selectOptions[i][0]+ '">' + selectOptions[i][0] + '</option>';
  }
  $("#quesSelect").html(options);
});

$( function () {
      //create param for scanning the Question Table
      console.log("msg after loading");
      var paramsScanQuestion = {
          TableName:tableNameQuestion
      };
      //send socket msg to server
      socket.emit('scanQuestion',paramsScanQuestion);
      console.log("Scan Question Table Done");
 })

$("#quesSelect").click(function(){
  //when selected, enable view to write answer
  //enable submit button

  $('select').change(function(){
    $("#buttonDiv").show();
    $("#textDiv").show();
    index = $('option:selected',this).index();

  });

})

$("#btnSubmitAnswer").click(function(){
  console.log("submit answer button clicked");
  var ansAnswer = $("#txtAnswer").val();
  //insert at Answer Table
  var paramsInsertAnswer = {
      TableName:tableNameAnswer,
      Item:{
          "question": qArray[index-1],
          "email": participantEmailArray[index-1],
          "info":{
              "answer": ansAnswer
          }
      }
  };
  socket.emit('insertAnswer', paramsInsertAnswer);
  console.log("inserted at Answer Table");

})



// ---------------Button Click Functions ---------//
          $('#view_question').click(function() {

  		    //window.location.href = "/view_questions"
          window.location.href = "/view_questions.html"

          })

		  $('#new_question').click(function() {
             //window.location.href = "/new_questions"
             window.location.href = "/new_questions.html"
		  })

		  $('#view_decision').click(function() {
             //window.location.href = "/view_decisions"
             window.location.href = "/decisions.html"
		  })
      $('#create_followup').click(function() {
             //window.location.href = "/view_decisions"
             window.location.href = "/followup.html"
		  })


});
