//create canvas
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let title_card = document.getElementById('title_card');
let score_counter = document.getElementById('player_score')
let new_score = 0
score_counter.innerHTML = new_score
//set-up default arrays and default starting positions
let invaders =[];
let bullets = [];
let enemy_bullets = [];
let default_x = 20;
let default_y = 20;
let direction = -20;
let shipx = 225;
let shipy = 660;
let player_array = [];

let game_speed = 400;
let enemy_fire_speed = 6000;
let enemy_colors = ['green', 'yellow', 'red', 'purple'];
let game_play = true;
// set interval to move blocks every half second
setInterval(updateGame, game_speed);
setInterval(enemy_fire, enemy_fire_speed)

let music = new Audio('themeSong.mp3');
music.loop = true;


function startGame() {
    while (invaders.length <= 20) {
        default_x = 20;
        for (let i =0; i< 4; i++){
            let color = enemy_colors[Math.floor(Math.random()*enemy_colors.length)]
            let invader = new create_entity(60, 30, default_x, default_y, color);
            invaders.push(invader);
            default_x += 90
        }
        default_y += 50
    }

    let player = new create_entity(60, 30, shipx, shipy, 'blue');
    player_array.push(player)
}

// used to create new invader
function create_entity(width, height, x, y, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color
    this.update = function() {
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

//draw player block at starting location

function draw_player(){
    clearCanvas();
    context.fillStyle = 'blue';
    context.fillRect(player_array[0].x, player_array[0].y, 60, 30)
}

//called every half second to run game. Calls for the player to be redrawn as well as bullets
function updateGame() {
    // at each interval clear the canvas and add to invader.y; update through create_entity method on line 19
    clearCanvas();
    enemy_check_collision()
    player_check_collision()
        let check = check_border();
        if( check === true){
            direction *= -1;
            invaders.forEach(function (element){
                element.y += 5
            })
        }
        draw_player();

        draw_bullets();
        draw_enemy_bullets();
        invaders.forEach(function (element) {
                element.x += direction;
                element.update()
        });

}
//event listeners for left right and spacebar keys
let counter = 0;
window.addEventListener('keydown', move_ship, false );
function move_ship(e){
    clear_start()
    if(counter < 1){
        music.play();
        startGame();
        counter += 1
    }
    switch(e.keyCode) {
        case 37: //move left
            player_array[0].x -= 8;
            break;
        case 39: //move right
            player_array[0].x += 8;
            break;
        case 32: //spacebar
            fire_bullet();
            break;
    }
    // updateGame()
    // - this will increase the speed of the game so the blocks move twice as fast when the player issues a command
    // could be a fun feature to implement at a later date
}


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
    let bullet = new create_entity(10, 30, player_array[0].x+25, player_array[0].y-30, 'red');
    bullets.push(bullet);
    draw_bullets();
    let shoot = new Audio('shoot.wav')
        shoot.play()
    startCoolDown()}
}


function enemy_fire(){
    // create array to hold bottom blocks and min value to compare against
    let can_fire = [];
    let min_y = 0;
    invaders.forEach(function(element){
        if(element.y > min_y){
            min_y = element.y
        }
    });
    // if element y value is equal to min y, store to array
    invaders.forEach(function(element){
        if(element.y === min_y){
            can_fire.push(element)
        }
    });
    //choose random bottom y to launch bullet from
        let start_fire = can_fire[Math.floor(Math.random()*can_fire.length)]
        let bullet = new create_entity(10, 30, start_fire.x+25, start_fire.y+30, 'green');
        enemy_bullets.push(bullet);
        draw_enemy_bullets()
    let shoot = new Audio('shoot.wav')
    shoot.play()

}


function draw_bullets(){
    bullets.forEach(function(element){
        element.y -= 10;
        element.update()
    })
}


function draw_enemy_bullets(){
    enemy_bullets.forEach(function(element){
        element.y += 10;
        element.update()
    })
}


//function for cooldown timer. Timer must finish before another bullet can be fired by the player
function startCoolDown(){
    cooldown = true;
    setTimeout(function(){ cooldown = false}, RECHARGE_TIME)
}


function enemy_check_collision(){
    // loop through all bullets and invaders to check for collision; if triggered, the invader and bullet are spliced out
    for(let b = 0; b < bullets.length; b++){
        for(let i= 0; i <invaders.length;i++) {
            if(invaders[i].x >= bullets[b].x && invaders[i].x <= bullets[b].x+60 &&
                invaders[i].y >= bullets[b].y-30 && invaders[i].y <= bullets[b].y){
                let explode = new Audio('invaderkilled.wav');
                explode.play();
                enemy_fire_speed -= 1000;
                let points = point_calculator(invaders[i].color)
                console.log(invaders[i].color)
                new_score += points
                score_counter.innerHTML = new_score
                invaders.splice(i,1);
                bullets.splice(b,1);
            }
        }
    }
}

function player_check_collision(){
    for(let i = 0; i < enemy_bullets.length; i++ ){
        if(enemy_bullets[i].x >= player_array[0].x && enemy_bullets[i].x <= player_array[0].x+60 &&
            player_array[0].y >= enemy_bullets[i].y && player_array[0].y <= enemy_bullets[i].y+30){
            player_array.splice(0,1)
            let explode = new Audio('explosion.wav');
            explode.play();
            gameOver()
        }
    }
}

function point_calculator(color){
    let points;
    if(color === 'green'){
        points = 50
    }else if(color === 'yellow'){
        points = 100
    }else if(color === 'red'){
        points = 150
    }else if(color === 'purple'){
        points = 200
    }
    return points
}

function clear_start(){
    title_card.style.display='none';

}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

function gameOver() {
    canvas.style.display='none'
    music.pause()
}