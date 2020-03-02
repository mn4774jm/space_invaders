let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let invader;
let invaders =[];
console.log(invaders);
let default_x = 20;
let default_y = 20;
let direction = -20;

setInterval(updateGame, 500);

function startGame() {
// create new game pieces and push to the invaders list
    for (let i = 0; i < 4; i++) {
        default_y = 20;
        invader = new invaderBlock(60, 30, default_x, default_y);
        invaders.push(invader);
        default_x += 90;

        for (let i = 0; i < 4; i++) {
            invader = new invaderBlock(60, 30, default_x, default_y);
            invaders.push(invader);
            default_y += 50
        }
    }
    // remove first invader for even numbered blocks
    invaders.shift()
}

// used to create new invader
function invaderBlock(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.update = function() {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

function updateGame() {
    // at each interval clear the canvas and add to invader.y; update through invaderBlock method on line 19
    //TODO everything moves back and forth but I need to sort out how to make it if any black hits either side
    clearCanvas();
        if(invaders[0].x <=5 || invaders[4].x >= 155){
            direction *= -1;
            invaders.forEach(function (element){
                element.y += 5
            })
        }
        invaders.forEach(function (element) {
                element.x += direction;
                element.update()

        })
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}