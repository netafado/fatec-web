function Meteoro(width, height, Sx, Sy, x, y, scale)
{
	Sprite.call(this, width, height, Sx, Sy, x, y);
	this._TO_RADIANS = Math.PI / 180;
	this.random = Math.random();
	this.rotate = 0;
	this.scale = scale;
	this.velx = 2;
	this.vely = 2;
	this.rotateDir = (2 *Math.PI) * Math.random();
	this.roteteVel = Math.random() * 3;  
	

	
};
Meteoro.prototype = {
	getWith: function ()
	{
		return this.width * this.scale;
	},

	getHeight: function()
	{
		return this.height * this.scale;
	},

	getX: function()
	{
		return this.x + ((this.width /2) * this.scale);
	},

	getY: function()
	{
		return this.y + ((this.height / 2) * this.scale);
	}
}

Meteoro.prototype.draw = function()
{
	this.rotate += 0.5;

	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.rotate * this._TO_RADIANS);
	ctx.fillStyle = "rgba(0, 0, 255, 0.0)";
	ctx.fillRect(-this.width / 2 * this.scale, -this.height / 2 * this.scale, this.width * this.scale, this.height * this.scale);

	ctx.drawImage(img, this.Sx, this.Sy, this.width, this.height,
					-this.width / 2 * this.scale, -this.height / 2 * this.scale,// posicao relacao com relção ao canvas
					this.width * this.scale, this.height * this.scale);
	ctx.restore();
};

Meteoro.prototype.update = function()
{
	this.velx = (0.5 + (fase * 0.2)) * Math.cos(this.rotateDir);
	this.vely = (0.5 + (fase * 0.2)) * Math.sin(this.rotateDir);
	this.x += this.velx;
	this.y += this.vely;
	if(this.x < 0 - this.width)
	{
		this.x = _WIDTH;
	}
	else if(this.x > _WIDTH){
		this.x = 0 - (this.width);
	}

	if(this.y < 0 - this.height )
	{
		this.y = _HEIGHT;
	}
	else if(this.y> _HEIGHT){
		this.y = 0 - (this.height);
	}
};
