var express =  require("express");

var routePong =  express.Router();

function router(nav){

	routePong.route('/')
	.get( function(req, res){
		res.render('pong', {nav});
	});

	routePong.route('/sala')
	.get(function(req, res){
		res.render('pongSala', {nav});
	});

	routePong.route('/sala/:id?')
	.get(function(req, res){
		res.render('pong', {nav, sala_id : req.params.id});
	});
	
	return routePong;
}





module.exports = router;