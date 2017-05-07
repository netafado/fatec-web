'use strict';
var express = require('express');
var app = express();

// a porta não pode ser inicializada pelo express
// para o socket.io funcionar
var http = require('http').Server(app);
var io = require('socket.io')(http);

var nav = [
	
	{
		link:'/',
		texto: 'home'
	},

	{
		link:'/contato',
		texto: 'contato'
	},

	{
		link:'/time',
		texto: 'time'
	},

	{
		link:'/sobre',
		texto: 'sobre nós'
	},

	{
		link:'/asteroids',
		texto: 'Asteroids'
	},

	{
		link:'/pong/sala',
		texto: 'Pong'
	}

];

var pongRouter =  require( __dirname + '/src/routes/pongRoute.js')(nav);
var indexRouter = require( __dirname + '/src/routes/indexRoute.js')(nav);
var outras = require( __dirname + '/src/routes/indexRoute.js')(nav);
var port = 3000;

// seta a qual template engine será usada
app.set('views', './src/views');
app.set('view engine', 'ejs');

// pasta para os arquivos staticos
app.use( express.static( __dirname + '/public') );

// dinamicoss
app.use( '/', indexRouter );
app.use( '/pong', pongRouter );
app.use( '/', outras );

http.listen( port );

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

