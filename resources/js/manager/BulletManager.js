
class BulletManager {

	constructor(canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.firstBulletStream = [];
		this.secondBulletStream = [];
		this.thirdBulletStream = [];
		this.fourthBulletStream = [];
	}

	draw(ctx) {
		this.drawBulletStream(ctx, this.firstBulletStream);
		this.drawBulletStream(ctx, this.secondBulletStream);
		this.drawBulletStream(ctx, this.thirdBulletStream);
		this.drawBulletStream(ctx, this.fourthBulletStream);
	}

	drawBulletStream(ctx, bulletStream) {
		for (var i = 0; i < bulletStream.length; i++) {
			bulletStream[i].update();
			bulletStream[i].draw(ctx);
			if (bulletStream[i].x < 0 || bulletStream[i].x > this.canvasWidth || bulletStream[i].y < 0 || bulletStream[i].y > this.canvasHeight) {
				bulletStream.splice(i, 1);
			}
		}
	}

	shootBullets(player, streamLevel) {
		if (streamLevel == 1) {
			this.levelOneStream(player);
		} else if (streamLevel >= 2) {
			this.levelTwoStreams(player);
			if (streamLevel >= 3) {
				this.levelThreeStreams(player);
			}
			if (streamLevel >= 4) {
				this.levelFourStreams(player);
			}
		}
	}

	levelOneStream(player) {
		this.createNewBullet(this.firstBulletStream, player, 6, 13, 14, 0, 100, 'red');
	}

	levelTwoStreams(player) {
		this.createNewBullet(this.firstBulletStream, player, 8, 18, 14, 0, 40, '#33ff33');
	}

	levelThreeStreams(player) {
		this.createNewBullet(this.secondBulletStream, player, 6, 13, 14, 10, 100, 'blue');
		this.createNewBullet(this.thirdBulletStream, player, 6, 13, 14, -10, 100, 'blue');
	}

	levelFourStreams(player) {
		this.createNewBullet(this.fourthBulletStream, player, 6, 13, -14, 0, 80, 'red')
	}

	createNewBullet(bulletStream, player, width, height, speed, rotation, distance, color) {
		if (bulletStream.length == 0 || bulletStream[bulletStream.length - 1].distance(player.x, player.y, width, height) > distance) {
			let newBullet = new Entity(player.x, player.y, width, height, color);
			newBullet.setRotation = player.rot + rotation;
			newBullet.setSpeed = speed;
			bulletStream.push(newBullet);
		}
	}
}