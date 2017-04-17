class Particle{

	constructor(position, direction, speed){

		this.p = position;

		this.v = new Vetor2d(1, 1);
		this.v.setAngle(direction);
		this.v.setLength(speed);

		this.a = new Vetor2d(0.2, 0.2);
	}

	draw(ctx)
	{
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(this.p.x, this.p.y, 20, 0, Math.PI * 2);
		ctx.fill();
	}

	update(dt)
	{
		
		this.v.add(this.a);
		this.p.add(this.v);

	}


}