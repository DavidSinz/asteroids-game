
class Player {

	constructor(x, y, width, height, imgSrc) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.radius = (width+height)/4;
		this.colRadius = (width+height)/4 - ((width+height)/4*0.7);
		this.img = new Image();
		this.img.src = imgSrc;
		this.rot = 0;
		this.acc = false;
		this.dec = false;
		this.speed = 0.1;
		this.maxVelocity = 7;
		this.vector = {x: 0, y: 0};
		this.dx;
		this.dy;
		this.health = 100;
	}

	update(maxWidth, maxHeight) {
		this.dx = Math.cos((this.rot+270)*Math.PI/180)*this.speed;
		this.dy = Math.sin((this.rot+270)*Math.PI/180)*this.speed;

		this.maximalVelocity(this.maxVelocity);

		this.dx = this.vector.x;
		this.dy = this.vector.y;
		
		this.checkOutOfBounds(maxWidth, maxHeight);
		
		this.x += this.dx;
		this.y += this.dy;
		this.acc = false;
		this.dec = false;
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rot*Math.PI/180);
		ctx.drawImage(this.img, -(this.width/2), -(this.height/2), this.width, this.height);
		ctx.restore();
	}

	maximalVelocity(maxVel) {
		if (this.acc && Math.abs(this.vector.x + this.dx) < maxVel) {
			this.vector.x += this.dx;
		}
		if (this.acc && Math.abs(this.vector.y + this.dy) < maxVel) {
			this.vector.y += this.dy;
		}
		if (this.dec && Math.abs(this.vector.x - this.dx) < maxVel) {
			this.vector.x -= this.dx;
		}
		if (this.dec && Math.abs(this.vector.y - this.dy) < maxVel) {
			this.vector.y -= this.dy;
		}
	}

	checkOutOfBounds(maxWidth, maxHeight) {
		if (this.x+this.dx > maxWidth+this.radius) {
			this.dx = -(maxWidth+this.radius+20);
		}
		if (this.x+this.dx < -this.radius) {
			this.dx = maxWidth+this.radius+25;
		}
		if (this.y+this.dy > maxHeight+this.radius) {
			this.dy = -(maxHeight+this.radius+20);
		}
		if (this.y+this.dy < -this.radius) {
			this.dy = maxHeight+this.radius+25;
		}
	}

	turnLeft() {this.rot -= 3;}
	turnRight() {this.rot += 3;}
	accelerate() {this.acc = true;}
	decelerate() {this.dec = true;}
}