class Input{
	constructor(keys){
		this.keys = {};
		this.down = {};
		this.pressed = {};


		for(var key in keys){

			var code  = keys[key];
			console.log(code);

			this.down[key] = false;
			this.pressed[key] = false;

			this.keys[code] = key;

		}
			console.log(this.down);

			console.log(this.pressed);
			console.log(this.keys);




		var self = this;
		document.addEventListener("keydown", function (e){

			if(self.keys[e.keyCode]){
			console.log(self.down[self.keys[e.keyCode]] );
			self.down[self.keys[e.keyCode]] = true;

			}
		});

		document.addEventListener("keyup", function (e){
			
			self.down[self.keys[e.keyCode]] = false;
			self.pressed[self.keys[e.keyCode]]= false;


		});
	}

	isDown(key){

		return this.down[key];

	}

	isPressed(key){

		if(this.pressed[key]){
			return false;
		}else if( this.down[key] ){
			return this.pressed[key] = true;
		}

		return false;

	}


}