const config = require('../settings.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.userPage = function(req, res){

	res.render('newUser', {nav: config.nav, name: config.siteNome});

}

exports.createUser = async (req, res, next) => {

	const user =  new User(req.body);

	try{
		// como essa função é async ela só irá para a proxima
		// linha quando terminar de salvar usando o await
		await user.save();
		console.log('work');
		res.redirect('/');
	}catch(err)
	{
		throw new Error('deu ruim');
		next(Error);
	}

	
}