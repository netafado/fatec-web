function Input(){
	var self = this;
	self.teclas = [];
	this.up;
	this.down;
	this.left;
	this.right;
	this.space;

	this.getInput = function(){
		this.up = self.teclas[38];
		this.down = self.teclas[40];
		this.left = self.teclas[39];
		this.right = self.teclas[37];
		this.space = self.teclas[32];
		
		};
	window.onkeydown = function(e)
	{
		self.teclas[e.keyCode] = true;


	};
	window.onkeyup = function(e)
	{
		self.teclas[e.keyCode] = false;
		if(e.keyCode == 32){
			self.teclas[e.keyCode] = false;
		}

	};	
}