class Game{
	constructor(w,h,canvas)
	{
		this.w = w;
		this.h = h;
		this.canvas = canvas;
		this.canvas.width = w;
		this.canvas.height = h;
		this.canvas.style.background = "black";

		this.ctx = canvas.getContext("2d");

		this.pA = new Particle(new Vetor2d(0, _H), -Math.PI /3, 10);

		this.input = new Input({left:37, up: 38, right:39, down: 40});

		this.lTime = Date.now();
		this.dt = 0;
		this.cTime = Date.now();
	}

	init()
	{
		this.gameLoop();
	}

	gameLoop()
	{
		var self = this;
		this.cTime = Date.now();
		this.dt = this.cTime - this.lTime;
		this.dt /= 100;
		this.update(self.dt);
		this.draw();

		this.lTime = this.cTime;

		window.requestAnimationFrame( this.gameLoop.bind(this) );
	}

	update(dt)
	{
		this.pA.update(dt);
		this.dt;

	}

	draw()
	{
		var self = this;
		this.ctx.clearRect(0,0, this.w, this.h);
		this.pA.draw(self.ctx);


	}
}