/*Creating table in local DynamoDB
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


const tableNameLogin = "Login"
const tableNameQuestion = "Question"
const tableNameAnswer = "Answer"
const tableNameDecision = "Decision"
const tableNameFollowup = "Followup"


/*only specify key attribute*/
const tablePromise = dynamodb.listTables({})
    .promise()
    .then((data) => {
        const exists = data.TableNames
            .filter(name => {
                return name === tableNameLogin;
            })
            .length > 0;
        if (exists) {
            return Promise.resolve();
        }
        else {
            const params = {
                TableName: tableNameLogin,
                KeySchema: [
                    { AttributeName: "email", KeyType: "HASH"},  //Partition key
                ],
                AttributeDefinitions: [
                    { AttributeName: "email", AttributeType: "S" },
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 10,
                    WriteCapacityUnits: 10
                }
            };
            //return dynamodb.createTable(params).promise();
            dynamodb.createTable(params, function(err, data){
              if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
              } else {
                console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
              }
            });
        }
    });

const tablePromise1 = dynamodb.listTables({})
        .promise()
        .then((data) => {
            const exists = data.TableNames
                .filter(name => {
                    return name === tableNameQuestion;
                })
                .length > 0;
            if (exists) {
                return Promise.resolve();
            }
            else {
                const params = {
                    TableName: tableNameQuestion,
                    KeySchema: [
                        { AttributeName: "question", KeyType: "HASH"},  //Partition key
                        { AttributeName: "email", KeyType: "RANGE" }  //Sort key
                    ],
                    AttributeDefinitions: [
                        { AttributeName: "question", AttributeType: "S" },
                        { AttributeName: "email", AttributeType: "S" }
                        //{ AttributeName: "answertype", AttributeType: "S" }
                        //{ AttributeName: "participant", AttributeType: "S" }
                    ],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 10,
                        WriteCapacityUnits: 10
                    }
                };
                //return dynamodb.createTable(params).promise();
                dynamodb.createTable(params, function(err, data){
                  if (err) {
                    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                  } else {
                    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                  }
                });
            }
        });

const tablePromise2 = dynamodb.listTables({})
      .promise()
      .then((data) => {
                  const exists = data.TableNames
                    .filter(name => {
                        return name === tableNameAnswer;
                    })
                    .length > 0;
                if (exists) {
                    return Promise.resolve();
                }
                else {
                    const params = {
                        TableName: tableNameAnswer,
                        KeySchema: [
                            { AttributeName: "question", KeyType: "HASH"},  //Partition key
                            { AttributeName: "email", KeyType: "RANGE"} //sort key
                        ],
                        AttributeDefinitions: [
                            { AttributeName: "question", AttributeType: "S" },
                            { AttributeName: "email", AttributeType: "S" }
                            //{ AttributeName: "answer", AttributeType: "S" }
                        ],
                        ProvisionedThroughput: {
                            ReadCapacityUnits: 10,
                            WriteCapacityUnits: 10
                        }
                    };
                    //return dynamodb.createTable(params).promise();
                    dynamodb.createTable(params, function(err, data){
                      if (err) {
                        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                      } else {
                        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                      }
                    });
                }
            });

const tablePromise3 = dynamodb.listTables({})
      .promise()
      .then((data) => {
                    const exists = data.TableNames
                                .filter(name => {
                                    return name === tableNameDecision;
                                })
                                .length > 0;
                            if (exists) {
                                return Promise.resolve();
                            }
                            else {
                                const params = {
                                    TableName: tableNameDecision,
                                    KeySchema: [
                                        { AttributeName: "question", KeyType: "HASH"}  //Partition key
                                    ],
                                    AttributeDefinitions: [
                                        { AttributeName: "question", AttributeType: "S" }
                                        //{ AttributeName: "decision", AttributeType: "S" }, //one of the answer
                                        //{ AttributeName: "email", AttributeType: "S" }  //whose answer is selected as a decision

                                    ],
                                    ProvisionedThroughput: {
                                        ReadCapacityUnits: 10,
                                        WriteCapacityUnits: 10
                                    }
                                };
                                //return dynamodb.createTable(params).promise();
                                dynamodb.createTable(params, function(err, data){
                                  if (err) {
                                    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                                  } else {
                                    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                                  }
                                });
                            }
});



//needed create followup page
const tablePromise4 = dynamodb.listTables({})
      .promise()
      .then((data) => {
                    const exists = data.TableNames
                                .filter(name => {
                                    return name === tableNameFollowup;
                                })
                                .length > 0;
                            if (exists) {
                                return Promise.resolve();
                            }
                            else {
                                const params = {
                                    TableName: tableNameFollowup,
                                    KeySchema: [
                                        { AttributeName: "question", KeyType: "HASH"}  //Partition key
                                    ],
                                    AttributeDefinitions: [
                                        { AttributeName: "question", AttributeType: "S" }
                                        //{ AttributeName: "decision", AttributeType: "S" }
                                        //{ AttributeName: "followupwdate", AttributeType: "S" }
                                    ],
                                    ProvisionedThroughput: {
                                        ReadCapacityUnits: 10,
                                        WriteCapacityUnits: 10
                                    }
                                };
                                //return dynamodb.createTable(params).promise();
                                dynamodb.createTable(params, function(err, data){
                                  if (err) {
                                    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                                  } else {
                                    //console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                                    console.log("Created table:" + tableNameFollowup);
                                  }
                                });
                            }
});
