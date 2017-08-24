
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

//var quesDecision = "What do we want from life?";
//var decDecision = "Happiness";
//var emailDecision = "abc@gmail.com";
//2nd set of entry @ decision table
var quesDecision = "How many vacation days you want a year?";
var decDecision = "100";
var emailDecision = "nahid@gmail.com";

var quesFollowup = "What do we want from life?";
var decFollowup = "Happiness";
var folFollowup = "task1, date; task2, date"; //followup task with due date
var doneFollowup = 0;


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


//params for scanning the Question table
var paramsDeleteQuestion = {
    TableName:tableNameQuestion
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


//params for scanning the Answer Table
var paramsScanAnswer = {
    TableName:tableNameAnswer
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

var paramsScanDecision = {
    TableName:tableNameDecision
};

//create params for Followup table

var paramsInsertFollowup = {
    TableName:tableNameFollowup,
    Item:{
        "question": quesFollowup,
        "info":{
            "decision": decFollowup,  //one of the answers
            "followup": folFollowup,   //followup task with due dates
            "done": doneFollowup
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

var paramsScanFollowup = {
    TableName:tableNameFollowup
};


var result;

/*Do the function call*/

//insertAtTable(paramsInsertLogin);
//readFromTable (paramsReadLogin);
//deleteFromTable (paramsDeleteLogin);
//console.log ("got global result");
//console.log (result);

//insertAtTable(paramsInsertDecision);
//readFromTable (paramsReadDecision);
//deleteFromTable (paramsDeleteDecision);
//scanFromTable (paramsScanDecision);

function readFromTable(params) {
  return new Promise((resolve, reject) => {
    docClient.get(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
          return reject(err);
      } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          result = JSON.stringify(data, null, 2);
          return resolve(result);
      }
    });
  });
}

readFromTable(paramsReadDecision).then((results) => {
  console.log('You got your results');
  console.log (results);
  console.log('Parsing JSON');
  var obj = JSON.parse(results);
  //from the parameters I passed, I already know which table I am reading
  //so parse the items accordingly
  console.log(obj.Item.question);
  console.log(obj.Item.info.decision);
  console.log(obj.Item.info.email);
});




function insertAtTable(params){

  docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
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

/*function scanFromTable (params){
  docClient.scan(params, function(err, data) {
    if (err) {
        console.error("Unable to Scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Scan succeeded:", JSON.stringify(data, null, 2));
    }
  });
}*/

function scanFromTable(params) {
  return new Promise((resolve, reject) => {
    docClient.scan(params, function(err, data) {
      if (err) {
          console.error("Unable to Scan Table. Error JSON:", JSON.stringify(err, null, 2));
          return reject(err);
      } else {
          console.log("Scan succeeded:", JSON.stringify(data, null, 2));
          result = JSON.stringify(data, null, 2);
          return resolve(result);
      }
    });
  });
}

scanFromTable(paramsScanDecision).then((results) => {
  console.log('You got Scan results');
  console.log (results);
  console.log('Parsing Scan DynamoDB JSON');
  var obj = JSON.parse(results);
  //from the parameters I passed, I already know which table I am reading
  //so parse the items accordingly
  var count = Object.keys(obj.Items).length;
  var qArray = [];
  var dArray = [];
  var eArray = [];
  for (i=0; i<count; i++){
    qArray.push(obj.Items[i].question);
    dArray.push(obj.Items[i].info.decision);
    eArray.push(obj.Items[i].info.email);
  }
  for (i=0;i<qArray.length; i++){
    console.log(qArray[i]);
    console.log(dArray[i]);
    console.log(eArray[i]);
  }
});
