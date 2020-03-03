//create canvas
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
//set-up default arrays and default starting positions
let invaders =[];
let default_x = 20;
let default_y = 20;
let direction = -20;
let shipx = 225;
let shipy = 660;
let bullets = [];
// set interval to move blocks every half second
setInterval(updateGame, 500);

function startGame() {
// create new enemy objects and push to the invaders list
    for (let i = 0; i < 4; i++) {
        default_y = 20;
        let invader = new create_entity(60, 30, default_x, default_y, 'black');
        invaders.push(invader);
        default_x += 90;

        for (let i = 0; i < 4; i++) {
            invader = new create_entity(60, 30, default_x, default_y, 'black');
            invaders.push(invader);
            default_y += 50
        }
    }
    // remove first invader for even numbered blocks
    invaders.shift()
}


// used to create new invader
function create_entity(width, height, x, y, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

//draw player block at starting location
function draw_player(){
    clearCanvas();
    context.fillStyle = 'blue';
    context.fillRect(shipx, shipy, 60, 30)

}

//called every half second to run game. Calls for the player to be redrawn as well as bullets
function updateGame() {
    // at each interval clear the canvas and add to invader.y; update through create_entity method on line 19
    clearCanvas();
        let check = check_border();
        if( check === true){
            direction *= -1;
            invaders.forEach(function (element){
                element.y += 5
            })
        }
        draw_player();
        draw_bullets();
        invaders.forEach(function (element) {
                element.x += direction;
                element.update()
        });

}
//event listeners for left right and spacebar keys
window.addEventListener('keydown', move_ship, false );
function move_ship(e){
    switch(e.keyCode) {
        case 37: //move left
            shipx -= 5;
            break;
        case 39: //move right
            shipx += 5;
            break;
        case 32: //spacebar
            fire_bullet();
            break;
    }
    // updateGame() - this will increase the speed of the game so the blocks move twice as fast when the player issues a command
    // could be a fun feature to impliment at a later date
}

//TODO ask why this function doesn't work with forEach and how the simplification works...Also why for 'doesn't loop'
function check_border() {
    for (let i = 0; i < invaders.length; i++) {
        return invaders[i].x <= 0 || invaders[i].x >= 155;
    }
}

//called when spacebar pressed. create cooldown variable and recharge time.
//if not on cooldown calls to draw bullet and starts recharge timer method
let cooldown = false;
let RECHARGE_TIME = 2000;
function fire_bullet(){
    if (!cooldown){
    let bullet = new create_entity(10, 30, shipx+25, shipy-30, 'red');
    bullets.push(bullet);
    draw_bullets();
    startCoolDown()}
}

function draw_bullets(){
    bullets.forEach(function(element){
        element.y -= 5;
        element.update()
    })
}

//function for cooldown timer
function startCoolDown(){
    cooldown = true;
    setTimeout(function(){ cooldown = false}, RECHARGE_TIME)
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}