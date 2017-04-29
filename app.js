'use strict';
var express = require('express');
var app = express();

// a porta não pode ser inicializada pelo express
// para o socket.io funcionar
var http = require('http').Server(app);
var io = require('socket.io')(http);

var pongRouter =  require( __dirname + '/src/routes/pongRoute.js');
var indexRouter = require( __dirname + '/src/routes/indexRoute.js');
var port = 3000;

// seta a qual template engine será usada
app.set('views', './src/views');
app.set('view engine', 'ejs');

// pasta para os arquivos staticos
app.use( express.static('public') );
app.use( express.static('pong') );

// dinamicas
app.use( '/pong', pongRouter );
app.use( '/', indexRouter );


http.listen(3000);

var window = {
	w: 1000,
	h: 600
}
var ball = {
	x: window.w / 2,
	y: window.h / 2,
	size: 25,
	vx: 3,
	vy: 1
}
var players = [];
var id = 0;
class Raquete{
	constructor( x, y, tamanho, id)
	{
		this.size = {w: 20, h: tamanho};

		this.id = id;
		this.color = 'white';
	}

	update()
	{
		var velX = 0;
		var velY = 0;

		var vel = new Vetor2d(velX, velY);

		this.pos.add(vel);

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
io.on('connection', function(socket){



  socket.emit('initGame', {
  	w: window.w,
  	h: window.h
  });

  setInterval(function(){

  	update();



  	socket.emit('update', {
  		bola: ball,
  		w: window
  	 });
  }, 1000 / 30);
});