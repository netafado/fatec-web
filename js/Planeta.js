function Planeta(width, height, Sx, Sy, x, y){
	Sprite.call(this, width, height, Sx, Sy, x, y);
	this.scale = Math.random();
}
Planeta.prototype = Object.create(Sprite.prototype,{
	contructor:{
		value: Planeta,
		enumerable: false,
		writable: false,
		configurable: true
	}
});
Planeta.prototype.changeScale = function(){
	this.scale = Math.random();	
};

Planeta.prototype.draw = function()
{
	ctx.drawImage(img, this.Sx, this.Sy, this.width, this.height,
					this.x, this.y, this.width * this.scale, this.height * this.scale);
};
Planeta.prototype.update = function()
{
	this.x -= 1.0;
	
	if(this.x < 0 - this.width){
		this.x = _WIDTH;
		this.changeScale();
	};
		
};