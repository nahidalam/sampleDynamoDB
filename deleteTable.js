/*Deleting table from local DynamoDB
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



var params = {
    TableName : "Login"
};

dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
