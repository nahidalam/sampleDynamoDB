
$(document).ready(function(){

var socket = io.connect('http://localhost:8080');
var whoSendsQuestion = "nahalam@cisco.com";

var tableNameQuestion = "Question"
var txtQuestionData;
var txtParticipantEmailData;
var ansTypeQuestion;


//all socket.on actions here


//actions for create questions
$("#btnInsertQues").click(function(){
  console.log("submit question button clicked");
  txtQuestionData = $("#txtQuestion").val();
  txtParticipantEmailData = $("#txtParticipantEmail").val();
  $('#questionformtopID input').on('change', function() {
   ansTypeQuestion = $('input[name=questionType]:checked', '#questionformtopID').val();
   console.log("selected checkbox is");
   console.log(ansTypeQuestion);
});

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

// ---------------Button Click Functions ---------//
          $('#view_question').click(function() {

  		    window.location.href = "/view_questions"

          })

		  $('#new_question').click(function() {
             window.location.href = "/new_questions"
		  })

		  $('#view_decision').click(function() {
             window.location.href = "/view_decisions"
		  })


});
