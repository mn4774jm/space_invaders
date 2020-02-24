let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let invader;
let invaders =[]
setInterval(updateGame, 500)


function startGame() {
// create new game piece
    let invader = new invaderBlock(60, 30, 20, 20)

}
// used to create new invader
function invaderBlock(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        context.fillStyle = 'black'
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

    function updateGame() {
        if (invader.y < 420) {
            clearCanvas();
            invader.y += 10;
            invader.update()
        }
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }



