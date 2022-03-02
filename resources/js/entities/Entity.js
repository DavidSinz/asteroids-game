
class Entity {

	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.radius = (width+height)/4;
		this.color = color;
		this.rot = 0;
		this.speed = 0;
	}

	update() {
		this.x += Math.cos((this.rot+270)*Math.PI/180)*this.speed;
		this.y += Math.sin((this.rot+270)*Math.PI/180)*this.speed;
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rot*Math.PI/180);
		ctx.fillStyle = this.color;
		ctx.fillRect(-(this.width/2), -(this.height/2), this.width, this.height);
		ctx.restore();
	}

	distance(x, y, width, height) {
		let distX = 0, distY = 0;
		if (this.x + this.radius < x) distX = x - this.x + this.radius;
		else if (this.x > x + width) distX = this.x - x + width;
		if (this.y + this.radius < y) distY = y - this.y + this.radius;
		else if (this.y > y + height) distY = this.y - y + height;
		return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
	}

	set setRotation(rot) {
		this.rot = rot;
	}

	set setSpeed(speed) {
		this.speed = speed;
	}
}