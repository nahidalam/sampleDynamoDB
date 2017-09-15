$(document).ready(function(){

  $('#logoImage').prepend('<img id="theImg" src="Images/decision_tracking_logo.png" />')
  $('#textImage').prepend('<img id="textImg" src="Images/ic_joanna@2x.png" />')
  $('#multipleChoiceImage').prepend('<img id="multipleChoiceImg" src="Images/ic_whit@2x.png" />')
  $('#dropdownImage').prepend('<img id="dropdownImg" src="Images/ic_dropdown.png" />')
  $('#starRatingImage').prepend('<img id="starRatingImg" src="Images/ic_starrating.png" />')
  $('#ratingScaleImage').prepend('<img id="ratingScaleImg" src="Images/ic_Q@2x.png" />')
  $('#fileUploadImage').prepend('<img id="fileUploadImg" src="Images/ic_Q@2x.png" />')
  $('#datetimeImage').prepend('<img id="datetimeImg" src="Images/ic_nahid@2x.png" />')
  $('#imageImage').prepend('<img id="imageImg" src="Images/ic_sunil@2x.png" />')
  $('#sliderImage').prepend('<img id="sliderImg" src="Images/ic_alice@2x.png" />')
  $('#shannonImage').prepend('<img id="shannonImg" src="Images/ic_shannon@2x.png" />')
  $('#aliceImage').prepend('<img id="aliceImg" src="Images/ic_alice@2x.png" />')
  $('#whitImage').prepend('<img id="whitImg" src="Images/ic_whit@2x.png" />')
  $('#sunilImage').prepend('<img id="sunilImg" src="Images/ic_sunil@2x.png" />')
  $('#nahidImage').prepend('<img id="nahidImg" src="Images/ic_nahid@2x.png" />')
  var name = "Justin," //will be passed from the login page through socket eventually

  $("#welcomeText").append(  name );
});
