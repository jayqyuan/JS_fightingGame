const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// fillRect takes in 4 parameter (x position, y position, rect width, rect height)
c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor(position){
        this.position = position
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, 150 )
        
    }
}

const player = new Sprite({
    x: 0,
    y:0
})

player.draw()