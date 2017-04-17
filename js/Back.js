function Back(width, height, Sx, Sy, x, y){
	Sprite.call(this, width, height, Sx, Sy, x, y);

};

Back.prototype = Object.create(Sprite.prototype,{
	constructor:{
		value: Back,
		enumerable:false,
		writable:false,
		configurable: true
	}
});

Back.prototype.update = function()
{
	this.x = this.x - 0.5;
	if(this.x + this.width < 0)
		this.x = _WIDTH -2;
}