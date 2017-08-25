
$(document).ready(function(){
 // -------------Default load ----------------//
          $("#contextheader").text("Open Questions")
          $("#infoheader").text("Click on the question below to respond")
          $("#view_question").css("border-bottom","3px solid blue")
          $('#mainbodyContent').load("http://localhost:8080/view_questions.html");
// ---------------Button Click Functions ---------//
          $('#view_question').click(function() {
          $("#contextheader").text("Open Questions")
          $("#infoheader").text("Click on the question below to respond")
          $(".menuButtonClass").css("border-bottom","none")
          $(this).css("border-bottom","3px solid blue")
  		  $('#mainbodyContent').load("http://localhost:8080/view_questions.html");

          })

		  $('#new_question').click(function() {
		  $("#contextheader").text("New Question")
		  $("#infoheader").text("Use the question builder to create a new question")
		  $(".menuButtonClass").css("border-bottom","none")
		  $(this).css("border-bottom","3px solid blue")
 		  $('#mainbodyContent').load("http://localhost:8080/new_questions.html");
		  })

		  $('#view_decision').click(function() {
		  $("#contextheader").text("Your Questions That Still Need Decisions")
		  $("#infoheader").text("Click on the questions below to make decisions and add tasks")
		  $(".menuButtonClass").css("border-bottom","none")
		  $(this).css("border-bottom","3px solid blue")
 		  $('#mainbodyContent').load("http://localhost:8080/view_decisions.html");
		  })

});
