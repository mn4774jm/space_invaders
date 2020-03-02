let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let invader;
let invaders =[];
// console.log(invaders);
let default_x = 20;
let default_y = 20;
let direction = -20;
let result;
let shipx = 225;
let shipy = 660;


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

//     player = new Player(60, 30, shipx, shipy);
// function Player(width, height, x, y){
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.update = function() {
//         context.fillStyle = 'red';
//         context.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

function draw_player(){
    clearCanvas();
    context.fillStyle = 'red';
    context.fillRect(shipx, shipy, 60, 30)

}


function updateGame() {
    // at each interval clear the canvas and add to invader.y; update through invaderBlock method on line 19
    clearCanvas();
        let check = check_border();
        if( check === true){
            direction *= -1;
            invaders.forEach(function (element){
                element.y += 5
            })
        }draw_player()
        invaders.forEach(function (element) {
                element.x += direction;
                element.update()
        });

}

window.addEventListener('keydown', move_ship, false );
function move_ship(e){
    switch(e.keyCode) {
        case 37: //move left
            shipx -= 5;
            break;
        case 39: //move right
            shipx += 5;
            break;
    }
    updateGame()

}

//TODO ask why this function doesn't work with forEach and how the simplification works...Also why for 'doesn't loop'
function check_border() {
    for (let i = 0; i < invaders.length; i++) {
        if (invaders[i].x <= 0 || invaders[i].x >= 155) {
            result = true;
        }else{
            result = false
        }
        return result
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}