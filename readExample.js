var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

AWS.config.update({
  region: 'us-east-2',
  endpoint: "http://localhost:8000"
});
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient()




var tableNameLogin = "Login"
var tableNameQuestion = "Question"
var tableNameAnswer = "Answer"
var tableNameDecision = "Decision"
var tableNameFollowup = "Followup"

var emailLogin = "shapla@gmail.com";
var pass = "1234";

var quesDecision = "What do we want from life?";
var decDecision = "Happiness";
var emailDecision = "abc@gmail.com";


/* params for loginTable*/


var params = {
    TableName: tabletableNameLogin,
    Key:{
        "email": emailLogin
    }
};


docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});
