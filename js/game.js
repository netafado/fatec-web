var estadoJogo = {
	gameover: 0,
	jogando: 1,
	menu: 2
};
var quantMeteoros = 4;

function obj()
{
	fase = 1;
	somFundo = new Sons(document.getElementById("musica"));
	somAtira = new Sons(document.getElementById("atira"));
	somAcelera = new Sons(document.getElementById("acelera"));
	somExplosao = new Sons(document.getElementById("explosao"));
	somAsteroidExplosao = new Sons(document.getElementById("impactoAsteroid"));
	back = new Back(_WIDTH, _HEIGHT, 0, 920, 0, 0 );
	back1 = new Back(_WIDTH, _HEIGHT, 0, 920, _WIDTH, 0 );
	globo = new Planeta(386, 382, 0, 536, _WIDTH * 0.5 - (386 /2), _HEIGHT / 2 - (386 /2));
	globoEmChamas = new Sprite(409, 422, 0, 114, _WIDTH * 0.5 - (409 /2), _HEIGHT / 2 - (422 /2));
	play = new Sprite(180, 69, 386, 777, _WIDTH * 0.5 - (180 * 0.5),  _HEIGHT / 2 - (69 /2));
	nave = new Nave(100, 74, 386, 845, _WIDTH * 0.1, _HEIGHT * 0.5 - (74 * 0.5) );
	
	for(i = 0; i < quantMeteoros; i++)
	{
		meteoros.push(new Meteoro(109, 87, 386, 685, Math.random() * _WIDTH + _WIDTH, Math.random() * _HEIGHT + _HEIGHT , Math.random() * 0.6 + 0.3));
	}
	
}

function reset()
{
	quantMeteoros = 4;
	fase = 1;
	vidas = 3;
	estado = 1;
	nave.x = _WIDTH / 2;
	nave.y = _HEIGHT / 2;
	pontosTotal = pontuacao;
	pontuacao = 0;
	meteoros = [];
	obj();


}

function perdeuVida()
{
	nave.x = _WIDTH / 2;
	nave.y = _HEIGHT / 2;
}

function updadeLevel(){
	fase++;
	quantMeteoros++;
	for(i = 0; i < quantMeteoros; i++)
	{
		meteoros.push(new Meteoro(109, 87, 386, 685, Math.random() * _WIDTH + _WIDTH, Math.random() * _HEIGHT + _HEIGHT , Math.random() * 0.6 + 0.3));
	}
	
}

function init(){
	framesGame = 0;
	canvas = document.getElementById("mainCanvas");
	canvas.width = _WIDTH;
	canvas.height = _HEIGHT;
	ctx = canvas.getContext('2d');
	canvas.addEventListener('click', function(evt){
		if(estado == estadoJogo.gameover || estado == estadoJogo.menu){
			estado = 1;
			somFundo.play();
		}

	});
	input = new Input();


};


function update()
{
	back.update();
	back1.update();
	globo.update();
	input.getInput();

	if(input.space)
	{
		tiros.push(new Tiro(4, 2, nave.x + nave.width / 2 , nave.y + nave.height /2, nave.getRot()));
		somAtira.play();
	}
	if(input.down)
	{
		nave.addVel();
		somAcelera.play();
	}


	if(input.up)
	{
		nave.rotate(2);
		nave.update();
	}


	if(input.left)
	{
		nave.rotate(-2);
		nave.update();
	}

	if(input.right)
	{
		nave.rotate(2);
		nave.update();
	}
	if(estado == estadoJogo.jogando)
	{		
		nave.update();

		for(i = 0; i < meteoros.length; i++)
		{  
			meteoros[i].update();
		}

		for(i = 0; i < tiros.length; i++)
		{
			tiros[i].update();
		}

		for(i = 0; i < tiros.length; i++)
		{
			if(tiros[i].getX() > _WIDTH + 100 || tiros[i].getX() < 0 - 10)
			{
			tiros.splice(i, 1);
			}
		}

		for(i = 0; i < meteoros.length; i++)
		{

			if(nave.getX() > meteoros[i].getX() - (meteoros[i].getWith() * 2) &&
				nave.getX() <  meteoros[i].getX() - (meteoros[i].getWith()))
			{
				console.log('x');

				if(nave.getY() > meteoros[i].getY() - (meteoros[i].getHeight() * 2) &&
				nave.getY() <  meteoros[i].getY() - (meteoros[i].getHeight()))
				{
					vidas--;
					perdeuVida();
					somExplosao.play();
					if(vidas < 1)
					{
						reset();
						estado = 2;
					}
				}
			}
				
		}

		for(i = 0; i < tiros.length; i++)
		{
			for(j = 0; j < meteoros.length; j++)
			{
				if(tiros[i].x > meteoros[j].x - (meteoros[j].getWith() /2) && 
					tiros[i].x + tiros[i].width < meteoros[j].x + (meteoros[j].getWith() /2))
				{
					if(tiros[i].y >= meteoros[j].y - (meteoros[j].getHeight() /2) && 
						tiros[i].y + tiros[i].height < meteoros[j].y + (meteoros[j].getHeight() /2))
					{
						tiros.splice(i, 1);
						meteoros.splice(j, 1);
						pontuacao += 100;
						somAsteroidExplosao.play();
						break;

					}

				}
			}
		}
	}

	if(meteoros.length < 1 )
	{
		updadeLevel();
	}
};



function draw(){
	ctx.clearRect(0,0, _WIDTH, _HEIGHT);
	back.draw();
	back1.draw();
	
	if(estado == estadoJogo.gameover)
	{
		globoEmChamas.draw();
		play.draw();
	}
	else if(estado == estadoJogo.jogando)
	{	
		
		ctx.font = "15px Orbitron";
		ctx.fillStyle = "white";
		ctx.fillText("Pontos: " + pontuacao, 20, 40);
		ctx.font = "12px Orbitron";
		ctx.fillText("Fase: " + fase, 20, 60);
		ctx.fillStyle = "#FFE505";
		ctx.fillText("Vidas: " + vidas, _WIDTH - 60, 40);
		globo.draw();
		for(i = 0; i < meteoros.length; i++)
		{
			meteoros[i].draw();
		}
		
		for(i = 0; i < tiros.length; i++)
		{
			tiros[i].draw();
			
		}
		nave.draw();
		

		framesGame++;
	}
	else if(estado == estadoJogo.menu)
	{
		play.draw();
		ctx.fillStyle ="#CE1818";
		var c = document.getElementById('mainCanvas');
		c.innerHTML = "<input type='text' name='nome'>";
		ctx.font = "15px Orbitron";
		ctx.fillText("A terra foi destruida vacilão", _WIDTH /2 - 120, _HEIGHT / 2 - 80);
		ctx.font = "30px Orbitron";
		ctx.fillText("Game Over", _WIDTH /2 - 90, _HEIGHT / 2 - 100);
		ctx.font = "18px Orbitron";
		ctx.fillStyle ="#F0FF00";
		ctx.fillText("Pontuaçao: " + pontosTotal, _WIDTH /2 - 80, _HEIGHT / 2 - 40);
		
	}

};
function gameloop()
{
	update();
	draw();
	window.requestAnimationFrame(gameloop);
};
obj();
init();
window.requestAnimationFrame(gameloop);
