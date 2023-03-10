const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// fillRect takes in 4 parameter (x position, y position, rect width, rect height)
// this is creating a black background/boundary for where our game will be 
c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.2

class Sprite {
    constructor({position, velocity}){ //putting curly brace around parameter allows us to pass in arguments in which ever order
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height )
        
    }

    update(){
        this.draw()
       
        // this is creating the speed that instance of sprite falls
        this.position.y += this.velocity.y
        // this prevents the players from falling out of the frame and its saying top of player + player height + rate of falling exceeds the total height, then we want to set velocity to 0
        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else{
					// this adds gravity on top of the sprite's speed
					this.velocity.y += gravity;
				}
    }
}

const player = new Sprite({
    position: {
    x: 0,
    y: 0
    },
    velocity:{
        x: 0,
        y: 10
    }
})


const enemy = new Sprite({
	position: {
		x: 400,
		y: 100,
	},
	velocity: {
		x: 0,
		y: 0,
	},
});


function animate() {
    window.requestAnimationFrame(animate)
    //to clear out rectangle so update method doesnt create a  bleeding effect on canvas
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

animate()