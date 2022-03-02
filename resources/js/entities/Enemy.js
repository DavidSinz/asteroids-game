
class Enemy extends Entity {

	constructor(x, y, width, height, health, imageSrc) {
		super(x, y, width, height);
		this.img = new Image();
		this.img.src = imageSrc;
		this.sx = (1024 / 8) * Math.floor(Math.random() * 8);
		this.sy = (1024 / 8) * Math.floor(Math.random() * 8);
		this.health = health;
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.sWidth = 128;
		this.sHeight = 128;
		this.sOffset = 18;
	}

	update() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rot*Math.PI/180);
		ctx.drawImage(this.img, this.sx+this.sOffset, this.sy+this.sOffset, this.sWidth-(this.sOffset*2), this.sHeight-(this.sOffset*2), -(this.width/2), -(this.height/2), this.width, this.height);
		ctx.restore();
	}

	rotate(rot) {
		this.rot += rot;
	}

	setSpeed(xSpeed, ySpeed) {
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
	}

	checkOutOfBounds(maxWidth, maxHeight) {
		let outOfBounds = false;
		if (this.x > maxWidth+100) outOfBounds = true;
		if (this.x+100 < 0) outOfBounds = true;
		if (this.y > maxHeight+100) outOfBounds = true;
		if (this.y+100 < 0) outOfBounds = true;
		return outOfBounds;
	}
}