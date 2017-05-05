class Game{
	constructor(w,h,canvas)
	{
		this.w 				=	w;
		this.h 				=	h;
		this.canvas 		=	canvas;
		this.canvas.width 	=	w;
		this.canvas.height 	=	h;
		
		this.canvas.style.background = "black";
		console.log("começou");
		this.ctx 	= canvas.getContext("2d");
		this.input 	= new Input({left:37, up: 38, right:39, down: 40});
		console.log(this.input);
		this.lTime	= 	Date.now();
		this.dt 	= 	0;
		this.cTime	= 	Date.now();


	}

	init()
	{
		this.gameLoop();
	}


	update(dt)
	{
		var self = this;
		//console.log('update');
		this.bola.update(dt);
		this.raq.update(dt);
		

	}

	draw()
	{
		var self = this;

		// limpa a tela
		this.ctx.clearRect(0, 0, self.w, self.w);

		//console.log('draw');
		this.bola.draw(self.ctx);
		this.raq.draw(self.ctx);

	}

	get getW()
	{
		return this.w;
	}

	get getH()
	{
		return this.h;
	}
}