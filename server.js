var http = require('http');
var fs = require('fs');
var url = require("url");
var path = require("path");
var ent = require('ent');


var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

AWS.config.update({
  region: 'us-east-2',
  endpoint: "http://localhost:8000"
});
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();




/*Server Creation*/
var server = http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript",
    '.jpg': "image/jpeg",
    '.png': "image/png"
  };

  //deal with post requests:
  if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            if (body.length > 1e6)
                request.connection.destroy();
        });
        request.on('end', function () {
            try {
              var post = JSON.parse(body);
              deal_with_post_data(request,post);
              response.writeHead(200, {"Content-Type": "text/plain"});
              response.end();
              return;
            }catch (err){
              response.writeHead(500, {"Content-Type": "text/plain"});
              response.write("Bad Post Data.  Is your data a proper JSON?\n");
              response.end();
              return;
            }
        });
    }



  //grab out REST requests and handle those, otherwise work as a normal file server.
  else if(uri=='/rest'){
    try {
      rest_request(url.parse(request.url,true).query);
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.end();
      return;
    }catch (err){
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write("Bad REST request.\n");
      response.end();
      return;
    }

  }else{
    //return an error if a page is requested that does not exist.
    fs.exists(filename, function(exists) {
      if(!exists) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
    }

    //by default, if no page is requested, serve index.html
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    //read the requested file and serve it up.
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      var headers = {};
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });

  });
  }
});

/*End of Server Creation*/

/*Database related operations*/

var paramsInsertLogin;
var paramsInsertQuestion;
var paramsReadQuestion;
var paramsDeleteQuestion;
var paramsInsertAnswer;
var paramsReadAnswer;
var paramsDeleteAnswer;
var paramsInsertDecision;
var paramsReadDecision;
var paramsDeleteDecision;



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

/*End of Database operation*/



// Loading socket.io
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    // When a "message" is received (click on the button), it's logged in the console
    socket.on('login', function (message) {
        console.log(' Received login request:' + message);
        paramsInsertLogin = message;
        insertAtTable(paramsInsertLogin);
        console.log('Created Entry in Database:' + message);
    });

    socket.on('insertQuestion', function (message) {

    });
    socket.on('readQuestion', function (message) {

    });
    socket.on('deleteQuestion', function (message) {

    });

    socket.on('insertAnswer', function (message) {

    });
    socket.on('readAnswer', function (message) {

    });
    socket.on('deleteAnswer', function (message) {

    });

    socket.on('insertDecision', function (message) {
      console.log('Received insert decision request:' + message);
      paramsInsertDecision = message;
      insertAtTable(paramsInsertDecision);
      console.log('Created Decision Entry in Database:' + message);


    });
    socket.on('readDecision', function (message) {
      console.log('Received read decision request:' + message);
      paramsReadDecision = message;
      readFromTable(paramsReadDecision);
      console.log('Read Decision from Database:' + message);

    });
    socket.on('deleteDecision', function (message) {

    });

});
server.listen(8080);
