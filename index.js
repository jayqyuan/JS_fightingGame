const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// fillRect takes in 4 parameter (x position, y position, rect width, rect height)
// this is creating a black background/boundary for where our game will be 
c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7

class Sprite {
    constructor({position, velocity}){ //putting curly brace around parameter allows us to pass in arguments in which ever order
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height )
        
    }

    update(){
        this.draw()
       this.position.x += this.velocity.x
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

// object for all the keys we will be using
const keys = {
	a: {
		pressed: false,
	},
	d: {
		pressed: false,
	},
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight:{
        pressed: false
    }
};

let lastKey
//default velocity of player is 0

function animate() {
    window.requestAnimationFrame(animate)
    
    //to clear out rectangle so update method doesnt create a  bleeding effect on canvas
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    
    //prevents players from drifting
    player.velocity.x = 0
    enemy.velocity.x = 0
    
    //player movement
    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
    } else if(keys.d.pressed && player.lastKey ==='d'){ 
        player.velocity.x = 5
    } 
    
    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
			enemy.velocity.x = -5;
		} else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
			enemy.velocity.x = 5;
		} 

}



window.addEventListener('keydown', (event)=>{
    switch (event.key) {
        case "d":
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case "a":
            keys.a.pressed = true
            player.lastKey = 'a'
            break;
        case "w":
            player.velocity.y = -20
            break;    

        case "ArrowRight":
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;
        case "ArrowUp":
            enemy.velocity.y = -20
            break;    
		}
    console.log(event)
})

window.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "d":
			keys.d.pressed = false;
			break;
		case "a":
			keys.a.pressed = false;
			break;
		// case "w":
		// 	keys.w.pressed = false;
		// 	break;
	}

    //enemy keys
    switch (event.key) {
            case "ArrowRight":
                keys.ArrowRight.pressed = false;
                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = false;
                break;
        }
	console.log(event);
});

animate()