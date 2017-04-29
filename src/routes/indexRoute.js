var ex =  require('express'),
	router = ex.Router();

router.route('/').get(function (req, res) {
	res.render('index');
});


module.exports = router;