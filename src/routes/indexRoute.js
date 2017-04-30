var ex =  require('express'),
	route = ex.Router();

function router(nav){
	route.route('/').get(function (req, res) {
	res.render('index', {nav});	
	});
	return route;
}


module.exports = router;