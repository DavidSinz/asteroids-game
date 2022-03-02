
class EnemyManager {

	constructor(canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.enemies = [];
		this.maxEnemies = 10;
		this.explosions = [];
		this.spawnCounter = 0;
		this.speedLevel = 1;
		this.enemySize = 40;
	}

	draw(ctx) {
		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].update();
			this.enemies[i].rotate(Math.floor(Math.random()*Math.floor(10)));
			this.enemies[i].draw(ctx);
			if (this.enemies[i].checkOutOfBounds(this.canvasWidth, this.canvasHeight)) {
				this.enemies.splice(i, 1);
			}
		}
		for (var i = 0; i < this.explosions.length; i++) {
			this.explosions[i].draw(ctx);
			if (this.explosions[i].explosionFinished) {
				this.explosions.splice(i, 1);
				i -= 1;
			}
		}
		this.spawnEnemies();
	}

	spawnEnemies() {
		if (this.enemies.length < this.maxEnemies) {
			let rw, rh, size, xSpeed, ySpeed, drift;
			drift = Math.random()*this.speedLevel;
			if (Math.floor(Math.random()*Math.floor(2))) {drift *= -1;}
			if (this.spawnCounter == 0) {
				rw = Math.floor(Math.random()*this.canvasWidth);
				rh = -25;
				xSpeed = drift;
				ySpeed = this.speedLevel;
			}
			if (this.spawnCounter == 1) {
				rw = this.canvasWidth + 25;
				rh = Math.floor(Math.random()*this.canvasHeight);
				xSpeed = -this.speedLevel;
				ySpeed = drift;
			}
			if (this.spawnCounter == 2) {
				rw = Math.floor(Math.random()*this.canvasWidth);
				rh = this.canvasHeight + 25;
				xSpeed = drift;
				ySpeed = -this.speedLevel;
			}
			if (this.spawnCounter == 3) {
				rw = -25
				rh = Math.floor(Math.random()*this.canvasHeight);
				xSpeed = this.speedLevel;
				ySpeed = drift;
			}
			size = (Math.log((this.speedLevel+1)/2)+1)*this.enemySize;
			let newEnemy = new Enemy(rw, rh, size, size, 10, 'resources/data/sprites/asteroids.png');
			newEnemy.setSpeed(xSpeed, ySpeed);
			this.enemies.push(newEnemy);
			this.spawnCounter++;
			if (this.spawnCounter % 4 == 0) {this.spawnCounter = 0;}
		}
	}

	checkBulletCollision(bullets) {
		let enemiesKilled = 0;
		for (var i = this.enemies.length -1; i >= 0 ; i--) {
			for (var j = bullets.length - 1; j >= 0 ; j--) {
				let bx = bullets[j].x,
					by = bullets[j].y;
				if (bx > this.enemies[i].x - this.enemies[i].radius &&
						by > this.enemies[i].y - this.enemies[i].radius &&
						bx < this.enemies[i].x + this.enemies[i].radius &&
						by < this.enemies[i].y + this.enemies[i].radius) {
					bullets.splice(j, 1);
					this.enemies[i].health -= 1;
					this.explosions.push(new Explosion(bx, by, 60, 60, 'resources/data/sprites/explosion.png'));
					j = 0;
				}
				if (this.enemies[i].health == 0) {
					this.enemies.splice(i, 1);
					enemiesKilled++;
					i = 0;
				}
			}
		}
		return enemiesKilled;
	}

	checkPlayerCollision(player) {
		let collision = false;
		for (var i = this.enemies.length -1; i >= 0 ; i--) {
			if (!this.enemies[i].checkOutOfBounds(this.canvasWidth, this.canvasHeight)) {
				if (player.x + player.colRadius > this.enemies[i].x - this.enemies[i].radius &&
						player.y + player.colRadius > this.enemies[i].y - this.enemies[i].radius &&
						player.x - player.colRadius < this.enemies[i].x + this.enemies[i].radius &&
						player.y - player.colRadius < this.enemies[i].y + this.enemies[i].radius) {
					collision = true;
					this.explosions.push(new Explosion(this.enemies[i].x, this.enemies[i].y, 120, 120, 'resources/data/sprites/explosion.png'));
					this.enemies.splice(i, 1);
					i = 0;
				}
			}
		}
		return collision;
	}

	setEnemySpeed(value) {
		this.speedLevel = value;
	}

}