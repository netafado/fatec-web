var express =  require("express");

var routePong =  express.Router();

	routePong.route('/')
	.get( function(req, res){
		res.render('pong');
	});

	routePong.route('/single/:id?')
	.get( function(req, res){
		res.send('pong');
	});





module.exports = routePong;