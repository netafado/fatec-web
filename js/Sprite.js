function Sprite(width, height, Sx, Sy, x, y){
	
	this.width = width;
	this.height = height;
	this.Sx = Sx;
	this.Sy = Sy;
	this.x = x;
	this.y = y;
};

Sprite.prototype.draw = function()
{
	ctx.drawImage(img, this.Sx, this.Sy, this.width, this.height,
					this.x, this.y, this.width, this.height);
};

Sprite.prototype.update = function()
{
	this.x = this.x - 0.5;
};