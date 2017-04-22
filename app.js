var http = require('http');


http.createServer( function( req , res ){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('head/n');
    res.end('end');
}).listen(3000);