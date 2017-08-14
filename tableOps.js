
/*Various table operations in local DynamoDB
Eventually will be part of the node.js Server, you need to make the info JSON
supported operations:
insert into table
read, update, delete an item
query and scan

Author: Nahid Alam
*/

var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

AWS.config.update({
  region: 'us-east-2',
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var tableNameLogin = "Login"
var tableNameQuestion = "Question"
var tableNameAnswer = "Answer"
var tableNameDecision = "Decision"
var tableNameFollowup = "Followup"

var emailLogin = "shapla@gmail.com";
var pass = "1234";

var emailQuestion = "shapla@gmail.com";
var quesQuestion = "What do we want from life?";
var ansTypeQuestion = "text";
var participantEmailQuestion = "shapla@gmail.com, abc@gmail.com";  //comma seperated string

var emailAnswer = "shapla@gmail.com";  //person replying, only one emailAnswer
var quesAnswer = "What do we want from life?";
var ansAnswer = "Happiness?";

var quesDecision = "What do we want from life?";
var decDecision = "Happiness";
var emailDecision = "abc@gmail.com";

var quesFollowup = "What do we want from life?";
var decFollowup = "Happiness";
var folFollowup = "task1, date; task2, date"; //followup task with due date


//var followupDecision = "task1,task2";  //comma seperated list of string

//var data = '{"email":"shapla@gmail.com", "info":{"password":"1234"}}';

//create params for inserting into Login Table
var paramsInsertLogin = {
    TableName:tableNameLogin,
    Item:{
        "email": emailLogin,
        "info":{
            "password": pass
        }
    }
};

//create params for reading from Login Table
var paramsReadLogin = {
    TableName: tableNameLogin,
    Key:{
        "email": emailLogin
    }
};

//create params for deleting from Login Table
var paramsDeleteLogin = {
    TableName:tableNameLogin,
    Key:{
        "email":emailLogin
    }
};

//create params for inserting into Question Table
var paramsInsertQuestion = {
    TableName:tableNameQuestion,
    Item:{
        "question": quesQuestion,
        "email": emailQuestion,
        "info":{
            "answerType": ansTypeQuestion,
            "participantEmail": participantEmailQuestion
        }
    }
};

//create params for reading from Question Table
var paramsReadQuestion = {
    TableName: tableNameQuestion,
    Key:{
      "question": quesQuestion,
      "email": emailQuestion
    }
};

//create params for deleting from Question Table
var paramsDeleteQuestion = {
    TableName:tableNameQuestion,
    Key:{
      "question": quesQuestion,
      "email": emailQuestion
    }
};


//create params for inserting into Answer Table
var paramsInsertAnswer = {
    TableName:tableNameAnswer,
    Item:{
        "question": quesAnswer,
        "email": emailAnswer,
        "info":{
            "answer": ansAnswer
        }
    }
};

//create params for reading from Answer Table
var paramsReadAnswer = {
    TableName: tableNameAnswer,
    Key:{
      "question": quesQuestion,
      "email": emailQuestion
    }
};

//create params for deleting from Answer Table
var paramsDeleteAnswer = {
    TableName:tableNameAnswer,
    Key:{
      "question": quesQuestion,
      "email": emailQuestion
    }
};


//create params for inserting into Decision Table
var paramsInsertDecision = {
    TableName:tableNameDecision,
    Item:{
        "question": quesDecision,
        "info":{
            "decision": decDecision,  //one of the answers
            //"followup": followupDecision
            "email": emailDecision  //whose answer was selected
        }
    }
};

//create params for reading from Decision Table
var paramsReadDecision = {
    TableName: tableNameDecision,
    Key:{
      "question": quesDecision
    }
};

//create params for deleting from Decision Table
var paramsDeleteDecision = {
    TableName:tableNameDecision,
    Key:{
      "question": quesDecision
    }
};

//create params for Followup table

var paramsInsertFollowup = {
    TableName:tableNameFollowup,
    Item:{
        "question": quesFollowup,
        "info":{
            "decision": decFollowup,  //one of the answers
            "followup": folFollowup   //followup task with due dates
        }
    }
};

//create params for reading from Decision Table
var paramsReadFollowup = {
    TableName: tableNameFollowup,
    Key:{
      "question": quesFollowup
    }
};

//create params for deleting from Decision Table
var paramsDeleteFollowup = {
    TableName:tableNameFollowup,
    Key:{
      "question": quesFollowup
    }
};


/*Do the function call*/

//insertAtTable(paramsInsertLogin);
var result;
//readFromTable (paramsReadLogin);
//deleteFromTable (paramsDeleteLogin);
//console.log ("got global result");
//console.log (result);


/*Parameters for Question Table*/

/*Parameters for Answer Table*/

/*Parameters for Decision Table*/



function insertAtTable(params){

  docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
}

function readFromTable (params){

  docClient.get(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
          //return null;
      } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));

      }
      result = JSON.stringify(data, null, 2);
      console.log ("got result");
      console.log (result);
  });

}

function deleteFromTable (params){
  docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
}
