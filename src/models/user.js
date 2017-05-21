/*

	Modelo de banco para usuarios	

*/

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({

	nome: 			{type: String, required: "O nome é obrigátorio"},

	registro_data: 	{type: Date, default: Date.now},

	idade: 			{type: Number, mim: 3, max: 88},

	email: 			{type: String, lowercase: true, trim: true, equired: "O nome é obrigátorio", unique: true},

	password: 		{ type: String, required: true }
});


module.exports = mongoose.model('User', userSchema);