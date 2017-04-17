function Tiro(width, height, x, y, rot){
	
	this.width = width;
	this.height = height;
	this.x = x = x;
	this.y = y = y;
	this.rot = rot * (Math.PI / 180);
	this.vel = 4;
};

Tiro.prototype = Object.create(Sprite.prototype, {
	contructor:{
		value: Nave,
		enumerable: false,
		writable: false,
		configurable: true
	}
});
Tiro.prototype.draw = function()
{
	ctx.fillStyle = "#03F1D8";
	ctx.fillRect(this.x , this.y, this.width, this.height);

};
Tiro.prototype.getX = function(){
	return this.x;
}
Tiro.prototype.update = function()
{
	this.x += Math.cos(this.rot) * this.vel;
	this.y += Math.sin(this.rot) * this.vel;
};