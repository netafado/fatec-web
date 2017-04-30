var express =  require("express");

var routePong =  express.Router();

function router(nav){
	routePong.route('/')
	.get( function(req, res){
		res.render('pong', {nav});
	});
	return routePong;
}





module.exports = router;