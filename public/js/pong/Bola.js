class Bola{
	constructor( x, y, tamanho, game)
	{
		this.pos = new Vetor2d(x , y);
		this.vel = new Vetor2d(5 , 2);
		this.size = tamanho;

		this.game = game;

		this.color = 'white';
	}

	update()
	{
		this.pos.add(this.vel);

		var x = this.pos.x + this.size  / 2,
			y = this.pos.y + this.size / 2;

		if( x - this.size < 0 )
			this.vel.x *= -1;

		if( x > this.game.w)
			this.vel.x *= -1;

		if( y - this.size < 0)
			this.vel.y *= -1;

		if( y > this.game.h)
			this.vel.y *= -1;
	}

	draw( ctx )
	{
		ctx.fillStyle = this.color;

		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI);
		ctx.fill();

	}
}