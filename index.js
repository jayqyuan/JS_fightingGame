const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// fillRect takes in 4 parameter (x position, y position, rect width, rect height)
// this is creating a black background/boundary for where our game will be 
c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7


const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './gameAssets/background1.png'
})

const player = new Fighter({
position: {
    x: 0,
    y: 0
    },
    velocity:{
        x: 0,
        y: 10
    },
    offset:{
        x: 0,
        y: 0
    }
})


const enemy = new Fighter({
	position: {
		x: 400,
		y: 100,
	},
	velocity: {
		x: 0,
		y: 0,
	},
    color: 'blue',
    offset:{
        x: -50,
        y: 0
    }
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



decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    
    //to clear out rectangle so update method doesnt create a  bleeding effect on canvas
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.draw()
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

    //detect for collision for player 
        if(
            rectangularCollision({
                rectangle1: player,
                rectangle2: enemy
            })
            &&player.isAttacking
        ){
            player.isAttacking = false
            enemy.health -= 20
            document.querySelector('#enemyHealth').style.width= enemy.health + '%'
        }
    // detect collision for enemy
       if(
            rectangularCollision({
                rectangle1: enemy,
                rectangle2: player
            })
            &&enemy.isAttacking
        ){
            enemy.isAttacking = false
            player.health -= 20
            document.querySelector('#playerHealth').style.width= player.health + '%'
        }
    
    //end game based on health
    if(enemy.health <= 0 || player.health <= 0 ){
        determineWinner({player, enemy, timerId})
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
        case ' ':
            player.attack()
            break    

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
        case "ArrowDown":
            enemy.attack()
            break
		}
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
	// console.log(event);
});

animate()