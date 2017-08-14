var http = require('http');
var fs = require('fs');
var url = require("url");
var path = require("path");
var ent = require('ent');

var currentIndex = null;

//below creates the server functionality.
//You shouldn't need to change this.
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

// Loading socket.io
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {

    //socket.emit('A', currentIndex);
    socket.emit('card', currentIndex);
    // When a "message" is received (click on the button), it's logged in the console
    socket.on('card', function (message) {
        console.log(' Received:' + message);
        currentIndex = message;
        socket.broadcast.emit('card', message);
        console.log(' Sent:' + message);
    });

    socket.on('reset', function (message) {
        console.log(' Received:' + message);
        currentIndex = null;
        socket.broadcast.emit('reset', message);
    });

  /*  socket.on('ask', function (message) {
        console.log(' Received:' + message);
        socket.broadcast.emit('A', currentIndex);
        console.log(' Sent Ask reply:' + currentIndex);
    });*/

    socket.on('finger', function (message) {
        console.log(' Received:' + message);
        socket.broadcast.emit('finger', message);
        console.log("sent finger");
    });

    socket.on('flash', function (message) {
        console.log(' Received:' + message);
        socket.broadcast.emit('flash', message);
        console.log("sent flash");
    });

});
server.listen(8080);
