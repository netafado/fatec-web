var ex =  require('express'),
	route = ex.Router();

function router(nav){
	//exemplo de como chamar um render para redenrizar
	route.route('/').get(function (req, res) {
		res.render('index', {nav});	
	});

	route.route('/contato').get(function (req, res) {
		res.render('index', {nav});	
	});

	route.route('/time').get(function (req, res) {
		res.render('time', {nav});	
	});

	route.route('/sobre').get(function (req, res) {
		res.send('sobre');	
	});
	return route;
}

module.exports = router;