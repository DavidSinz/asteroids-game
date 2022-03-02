
class Explosion extends Entity {

	constructor(x, y, width, height, imageSrc) {
		super(x, y, width, height);
		this.img = new Image(this.width, this.height);
		this.img.src = imageSrc;
		this.patternLength = 4;
		this.patternSize = 128;
		this.sx = 0;
		this.sy = 0;
		this.explFinished = false;
	}

	draw(ctx) {
		if (!this.explosionFinished) {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.drawImage(this.img, 
										this.sx*this.patternSize, 
										this.sy*this.patternSize, 
										this.patternSize, 
										this.patternSize, 
										-(this.width/2), 
										-(this.height/2), 
										this.width, 
										this.height);
			ctx.restore();
			this.sx++;
			if (this.sx == this.patternLength) {
				this.sx = 0;
				this.sy++;
			}
			if (this.sy == this.patternLength) {
				this.explFinished = true;
			}
		}
	}

	get finished() {
		return this.explFinished;
	}
}