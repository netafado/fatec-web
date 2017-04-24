class Raquete{
	constructor( x, y, tamanho, game)
	{
		this.pos = new Vetor2d(x , y);
		this.vel = new Vetor2d(5 , 2);
		this.size = {w: 20, h: tamanho};

		this.game = game;
		console.log(game);
		this.color = 'white';
	}

	update()
	{
		var velX = 0;
		var velY = 0;

		if(this.game.input.isDown('down')){
			velY = 1;
		}

		if(this.game.input.isDown('up')){
			velY = -1;
		}

		var vel = new Vetor2d(velX, velY);

		this.pos.add(vel);

	}

	draw( ctx )
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
	}
}