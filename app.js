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
//app.use( express.static( __dirname + '/pong') );

// dinamicas
app.use( '/', indexRouter );
app.use( '/pong', pongRouter );
app.use( '/', outras );

http.listen(3000);



var window = {
	w: 800,
	h: 500
}
function Ball (){
	this.x =  window.w / 2,
	this.y =  window.h / 2,
	this.size =  25,
	this.vx= 3,
	this.vy= 1
}


Ball.prototype = {
	update: function(){
		this.x += this.vx;
		this.y += this.vy;

		if( this.x < 0 )
			this.vx *= -1;

		if( this.x > window.w)
			this.vx *= -1;

		if( this.y  < 0)
			this.vy *= -1;

		if( this.y > window.h)
			this.vy *= -1;
	}
}


function Game(id_sala){
	this.players = [];
	this.ball = new Ball();
	this.id = id_sala;
	this.time;

}

Game.prototype = {
	update: function(){
		this.ball.update();
	}, 
	addPlayer: function(player){
		this.players.push(player);
		
	},
	init: function(io){
		var self = this;
		
 			self.update();

			  self.players[0].io.emit('update', {
  					bola: self.ball,
  					w: window,
					id: self.id,
					players: self.players
  			 	});
			
	  
			setInterval(function(){
				io.to(self.id).emit({
					bola: self.ball,
  					w: window,
					id: self.id,
					players: self.players
				});
			}, 1000);
		
	  
	},
	parar: function(){
		clearInterval(this.time.bind(this));
	}
}

var sala_id = 0;
var player_id = 1;
var salas = [];
var players = [];

// sala
function Sala(game, id){
	this.game = game;
	this.id = id;
}







var id = 0;
class Player{
	constructor( x, y, tamanho, id, socket_id)
	{
		if(id === 1){
			this.x = 0;
			this.y = 50;
		}

		if(id === 2){
			this.x = 500;
			this.y = 50;
		}

		this.w = 30;
		this.h = 120;
		this.size = {w: 20, h: tamanho};
		this.id = id = id + 1;
		this.color = 'white';
		this.io = socket_id;
		console.log(this.io.emit);
	}

	update(posicao)
	{
		var velX = 0;
		var velY = 0;

		

	}

}


function update(){
	ball.x += ball.vx;
	ball.y += ball.vy;

	if( ball.x < 0 )
		ball.vx *= -1;

	if( ball.x > window.w)
		ball.vx *= -1;

	if( ball.y  < 0)
		ball.vy *= -1;

	if( ball.y > window.h)
		ball.vy *= -1;
}
// quando conectar criaremos uma nova raquete 
// e adicionaremos ela a lista de jodadores
//  update das variaveis no server
// função draw passa as variaveis para serem renderizadas no cliente

// bola se movimenta 
//var bola = new Bola(20, 20, 20, 20);
// no lado do cliente emitira uma mensagem toda vez que a raquete se movimentar
var ids = 0;
var currentIO;
io.on('connection', function(socket){
currentIO = socket;
socket.id = ids++;

// ao criar a sala
socket.on('criarSala', function(data){
	
	sala_id +=1;
	socket.join(sala_id);
	salas[sala_id] = new Sala(new Game(sala_id), sala_id);
	console.log(salas[sala_id]);
	socket.emit('salaCriada', { sala: sala_id });


});


  socket.emit('initGame', {
  	w: window.w,
  	h: window.h
  });

  
// ao criar a sala
socket.on('add_player', function(data){
	
	salas[data.id_sala].game.addPlayer(new Player(20, 200, 100, player_id, currentIO));
	
	if(salas[data.id_sala].game.players.length > 1)
	{
		
		salas[data.id_sala].game.init(socket);

	}
	player_id ++;

	if(player_id >= 3)
		player_id = 1;
		
	
});
  function comecar(){
	  setInterval(function(){

		io.emit('update', {
			bola: ball,
			w: window
		});
		}, 1000 / 30);
	}

	
});