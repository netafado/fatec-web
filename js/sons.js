function Sons(som){
	this.som = som;
};
Sons.prototype = {
	play: function(){
		this.som.load();
		this.som.play();
	},
}