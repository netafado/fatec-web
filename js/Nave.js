function Nave(width, height, Sx, Sy, x, y){
	
	Sprite.call(this, width, height, Sx, Sy, x, y);
	this.rot = 0;
	this.velX = 0;
	this.velY = 0;
};

Nave.prototype = Object.create(Sprite.prototype, {
	contructor:{
		value: Nave,
		enumerable: false,
		writable: false,
		configurable: true

	}
});
Nave.prototype.addVel = function()
{
	//limita a velocidade
	if(this.velX * this.velX + this.velX * this.velX < 20*20 )
	{
		
		this.velX += 0.04*Math.cos(this.rot* (Math.PI / 180));
		this.velY += 0.04*Math.sin(this.rot* (Math.PI / 180));
	}
};


Nave.prototype.draw = function()
{
	ctx.save();
	
	ctx.translate(this.x + this.width / 2, this.y + this.height /2);
	ctx.rotate(this.rot * (Math.PI / 180));
	//ctx.fillStyle = "rgba(255, 255, 255, 0.0)";
	//ctx.fillRect(-this.width /4, -this.height/4, this.width / 2, this.height / 2);
	ctx.drawImage(img, this.Sx, this.Sy, this.width, this.height,
					-this.width /4, -this.height/4, this.width * 0.5, this.height * 0.5);
	
	ctx.restore();
};

Nave.prototype.rotate = function (angulo)
{	
	this.rot += angulo;
};
Nave.prototype.update = function(tecla)
{
	//acrescenta a velocidade ao valor de X
	this.x += this.velX;
	this.y += this.velY;
		
	if(this.x > _WIDTH + this.width)
	{
		this.x = 0 - this.width / 2;
	}else if(this.x < 0 - this.width){
		this.x = _WIDTH;
	}

	if(this.y < 0 - this.width / 2)
	{
		this.y = _HEIGHT - this.width /2;
	}else if(this.y > _HEIGHT + this.width){
		this.y = 0;
	}
	
	this.velX *= 0.99;
	this.velY *= 0.99;

};

Nave.prototype.getRot = function()
{
	return this.rot;
};
Nave.prototype.getX = function()
{
	return this.x - this.width/4;
};
Nave.prototype.getY = function()
{
	return this.y - this.height/4;
};