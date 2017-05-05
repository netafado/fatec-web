class Vetor2d{

	constructor(x, y)
	{
		this.x = x;
		this.y = y;

	}

	setLength(k)
	{
		this.x *= k;
		this.y *= k;
	}

	add( v )
	{
		this.x += v.x;
		this.y += v.y;
	}

	getLength(){

		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	setAngle( angle )
	{
		var length = this.getLength();

		this.x = Math.cos(angle)* length;
		this.y = Math.sin(angle)* length;
	}

	getAngle()
	{
		return Math.atan2(this.y, this.x);
	}

	static versor( v )
	{
		var length = v.getLength();

		var x = v.x / length;
		var y = v.y / length;

		return new Vetor2d( x, y );
	}

	static dotProduct( v1, v2 )
	{
		return v1.x * v2.x + v1.y * v2.y;
	}
}

