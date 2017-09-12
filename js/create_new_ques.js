$(document).ready(function(){

  $('#logoImage').prepend('<img id="theImg" src="Images/decision_tracking_logo.png" />')
  //$('#logoImage').prepend('<img id="theImg" src="https://i0.wp.com/sociologicalimagination.org/wp-content/uploads/2015/06/2.jpg" />')
  $('#textImage').prepend('<img id="textImg" src="Images/ic_textbox.png" />')
  $('#multipleChoiceImage').prepend('<img id="multipleChoiceImg" src="Images/ic_multiplechoice.png" />')
  $('#dropdownImage').prepend('<img id="dropdownImg" src="Images/ic_dropdown.png" />')
  $('#starRatingImage').prepend('<img id="starRatingImg" src="Images/ic_starrating.png" />')
  $('#ratingScaleImage').prepend('<img id="ratingScaleImg" src="Images/ic_ratingscale.png" />')
  $('#fileUploadImage').prepend('<img id="fileUploadImg" src="Images/ic_fileupload.png" />')
  $('#datetimeImage').prepend('<img id="datetimeImg" src="Images/ic_datetime.png" />')
  $('#imageImage').prepend('<img id="imageImg" src="Images/ic_image.png" />')
  $('#sliderImage').prepend('<img id="sliderImg" src="Images/ic_slider.png" />')

  var name = "Justin" //will be passed from the login page through socket eventually

  $("#welcomeText").append(  name );
});
