const ex =  require('express'),
	route = ex.Router();

const config = require('../settings.js');

function router(nav){
	//exemplo de como chamar um render para redenrizar
	route.route('/').get(function (req, res) {
		
		res.render('index', {name: config.siteNome, nav: nav});	
	});

	route.route('/contato').get(function (req, res) {
		res.render('index', {name: config.siteNome, nav: nav});		
	});

	route.route('/time').get(function (req, res) {
		res.render('index', {name: config.siteNome, nav: nav});		
	});

	route.route('/sobre').get(function (req, res) {
		res.render('index', {name: config.siteNome, nav: nav});	
	});
	return route;
}

module.exports = router;