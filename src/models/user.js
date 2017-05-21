/*

	Modelo de banco para usuarios	
	URL doc:
	http://dom.spec.whatwg.org/#dom-node-nodename

*/

const mongoose =  require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = new  mongoose.createSchema({

	nome: 			{type: String, required: "O nome é obrigátorio"}

	registro_data: 	{type: Date, default: Date.now},

	idade: 			{type: Number, mim: 3, max: 88},

	email: 			{type: String, lowercase: true, trim: true, equired: "O nome é obrigátorio"}
});

module.exports = mongoose.model('User', userSchema);