'use strict';
const express 	= 	require('express');
const app 		= 	express();


// importa as variaveis do arquivo variables.env
require('dotenv').config({path: 'variables.env'});

const mongoose 	=  require('mongoose');

// a porta não pode ser inicializada pelo express
// para o socket.io funcionar por isso o http
const http 		= require('http').Server(app);
const io 		= require('socket.io')(http);

const settings 	= require( __dirname + '/src/settings.js');
const nav 		=  settings.nav;

const cookieParser 	= require('cookie-parser');
const bodyParser 	= require('body-parser');
const passport 		= require('passport');
const promisify 	= require('es6-promisify');

// seta a qual template engine será usada
app.set('views', './src/views');
app.set('view engine', 'ejs');


// conexão com o banco de dados
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`Deu ruim → ${err.message}`);
});

// importar os modelos 
require( __dirname + '/src/models/user');

// as rotas precisam ir depois de importar os modelos 
const pongRouter 	=  require( __dirname + '/src/routes/pongRoute.js')(nav);
const indexRouter 	=  require( __dirname + '/src/routes/indexRoute.js')(nav);
const userRouter	=  require( __dirname + '/src/routes/user.js');
const outras 		=  require( __dirname + '/src/routes/indexRoute.js')(nav);

// pasta para os arquivos staticos
app.use( express.static( __dirname + '/public') );

// coloca as propriedades do request dentro de req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use( '/', indexRouter );
app.use( '/pong', pongRouter );
app.use( '/user', userRouter );
app.use( '/', outras );



// 404
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

//ultimo 
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



http.listen( process.env.PORT );

var window = {
	w: 800,
	h: 500
}

class GameCoisa{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	update(){

	}
}

 /**
   * Criação do player
   *
   * @param {Number} x - posição em x.
   * @param {Number} posição em y.
   * @param {Object}  Mantem uma referencia so socket.
   */
class Player extends GameCoisa{
	constructor(x, y, socket){
		super(x, y);
		this.socket = socket;
		this.w = 20;
		this.h = 120;
	}

	update(){

	}

	getPlayer(){
		var self = this;
		return {
			x : self.x,
			y : self.y,
			w : self.w,
			h : self.h
		}
	}
}


class Bola extends GameCoisa{
	constructor(x, y){
		super(x, y);
		this.vx = 1;
		this.vy = 1;
 		this.size = 20;
		this.color = 'white';	
	}

	update(tela){
		this.x += this.vx;
		this.y += this.vy;

		if( this.x > tela.w )
			this.vx *= -1

		if(this.x < 0)
			this.vx *= -1


		if( this.y > tela.h )
			this.vy *= -1

		if(this.y < 0)
			this.vy *= -1

		console.log( this.y > tela.h);
	}
}


class Game
{
	constructor(roomName)
	{
		this.players = [];
		this.roomName = roomName;
		this.run = false;
		this.FPS = 1000 / 30;
		this.ball = new Bola(200, 300);
		this.tela = {w: 800, h: 500}
	}

	update(){
		var self = this;
		this.ball.update(self.tela);		
	}

	logica(){

	}

	addPlayer(user){
		// uma sala não pode ter mais de 2 jogadores
		if(this.players.push.length < 2)
			this.players.push(user);
		console.log('adicionado');
	}

	init(){	

		// para não perder referência ao objeto
		var self = this;
		setInterval(function(){
		
		var objsPlayers = [];
		for(var i = 0; i < self.players.length; i++){
			objsPlayers.push(self.players[i].getPlayer());
		}			

		for(var i = 0; i < self.players.length; i++)
		{
			self.update();
			self.logica();


			self.players[i].socket.emit('update', {bola: self.ball, players: objsPlayers});
		}

		}.bind(this), self.FPS);

	}

	quanPLayers()
	{
		var self = this;
		return self.players.length;
	}

}

// IO
 
var users = [];
var a = [1,2,3,4];
var sala = 1;
var games = []
// incia a conexão 
io.on('connection', function(socket){


	users.push(socket);

	// emite apenas para o úsuario que acaboude se conectar
	socket.emit('handshaking', { mg: "number: " + users.length});
	
	// quando o socket se desconectar
	socket.on('disconnect', function(){
			
		// emite para todos que estiveram conectados menos para o user que se desconectou
		socket.broadcast.emit('handshaking', {mg: "number: " + users.length} );

		users.splice(socket);
	});

	// passar o numero da sala
	socket.on('pegarSala', function(data){

		socket.emit('salaCriada', {sala: sala});
	

	});

	// lógica para criação das 'salas' e começo do gameloop
	socket.on('criarPlayer', function(data){
		console.log('dentro do criar player');
		if( !games[data.id] ){
			var jogo = new Game(data.id);
			
			//console.log(jogo.players);
			games[data.id] = jogo;

			sala++;
		}

		console.log(games[data.id]);
		if(games[data.id].quanPLayers() < 2){

			// criar o jogador 
			if(games[data.id].quanPLayers() == 1){
				var player =  new Player(10, 20, socket);
			}else
			{
				var player =  new Player(770, 20, socket);
			}				

			games[data.id].addPlayer(player);

			// numero de jogadores for atingido
			console.log(games[data.id].quanPLayers() === 2)
			if(games[data.id].quanPLayers() === 2)
				games[data.id].init();
		}
		else{


			if(!games[data.id].run)
				games[data.id].init();
		}
		console.log('sala ' + data.id + "  tem " + games[data.id].quanPLayers());		
	
	});
});

