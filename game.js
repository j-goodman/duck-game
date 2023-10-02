class Game {
    constructor () {
        this.objects = []
        setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (let object of this.objects) {
                object.move()
                object.draw()
            }
        }, 30)
    }
}

class GameObject {
    constructor (x = 0, y = 0) {
        this.image = null
        this.pos = {
            x: x,
            y: y,
        }
        this.speed = {
            x: 0,
            y: 0,
        }
        game.objects.push(this)
    }

    move () {
        this.pos.x += this.speed.x
        this.pos.y += this.speed.y
        if (this.pos.y > 326) {
            this.pos.y = 326
        }
        if (this.individualMove) {
            this.individualMove()
        }
    }

    draw () {
        ctx.drawImage(this.image, this.pos.x, this.pos.y)
    }
}

class Duck extends GameObject {
    individualMove () {
        this.speed.y += 1
        if (game.controller.leftKeyDown) {
            this.speed.x = -6
        } else if (game.controller.rightKeyDown) {
            this.speed.x = 6
        } else {
            this.speed.x = 0
        }
    }

    jump () {
        if (this.pos.y === 326) {
            this.speed.y = -16
        }
    }
}

const game = new Game ()

let duck = new Duck (223, 160)
duck.image = new Image ()
duck.image.src = "duck.png"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.style.imageRendering = "pixelated"

game.controller = {
    leftKeyDown: false,
    rightKeyDown: false
}

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp") {
        duck.jump()
    }
    if (event.code === "ArrowLeft") {
        game.controller.leftKeyDown = true
    }
    if (event.code === "ArrowRight") {
        game.controller.rightKeyDown = true
    }
})

document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") {
        game.controller.leftKeyDown = false
    }
    if (event.code === "ArrowRight") {
        game.controller.rightKeyDown = false
    }
})