class Sprite {
	constructor({ position, imageSrc }) {
		//putting curly brace around parameter allows us to pass in arguments in which ever order
		this.position = position;
		this.width = 50;
		this.height = 150;
        this.image = new Image()
        this.image.src = imageSrc
	}

	draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }

	update() {
		this.draw();
	}
}

class Fighter {
	constructor({ position, velocity, color = "red", offset }) {
		//putting curly brace around parameter allows us to pass in arguments in which ever order
		this.position = position;
		this.velocity = velocity;
		this.width = 50;
		this.height = 150;
		this.lastKey;
		this.attackBox = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			offset,
			width: 100,
			height: 50,
		};
		this.color = color;
		this.isAttacking;
		this.health = 100;
	}

	draw() {
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.width, this.height);

		//attack box
		if (this.isAttacking) {
			c.fillStyle = "green";
			c.fillRect(
				this.attackBox.position.x,
				this.attackBox.position.y,
				this.attackBox.width,
				this.attackBox.height
			);
		}
	}

	update() {
		this.draw();
		this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
		this.attackBox.position.y = this.position.y;

		this.position.x += this.velocity.x;
		// this is creating the speed that instance of sprite falls
		this.position.y += this.velocity.y;
		// this prevents the players from falling out of the frame and its saying top of player + player height + rate of falling exceeds the total height, then we want to set velocity to 0
		if (this.position.y + this.height + this.velocity.y >= canvas.height - 105) {
			this.velocity.y = 0;
		} else {
			// this adds gravity on top of the sprite's speed
			this.velocity.y += gravity;
		}
	}

	attack() {
		this.isAttacking = true;
		// sets attack to only last for a certain amount of time before going back to isAttacking = false
		setTimeout(() => {
			this.isAttacking = false;
		}, 100);
	}
}
