var express = require('express');
var router = express.Router();

var route = function(nav){

    router.get('/contato', function(req, res){
        res.send('contato');
    });

    router.get('/time', function(req, res){
        res.send('contato');
    });

    return router;

}


module.exports = route;