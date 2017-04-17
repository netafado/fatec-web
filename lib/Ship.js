class Ship{

	constructor(position, direction, speed){
		super(position, direction, speed);

		this.turningLeft = false;
		this.turningRight = false;

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

	setX(vel){

	this.p.x += vel;


	}

	setY(vel){
		this.p.y += vel;
	}


}