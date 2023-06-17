const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let pos = 0;

const image = document.getElementById('image');

const player = {
    w: 148,
    h: 148,
    x: 100,
    y: 200,
    speed: 8,
    dx: 0,
    dy: 0
}

const text = {
    word: 'canvas',
    x: player.x,
    y: player.y,
    errors: []
}

function drawPlayer() {
    ctx.drawImage(image, player.x, player.y, player.w, player.h); 
    ctx.font = "30px Arial";
    ctx.fillStyle = '#00ff00';
    ctx.fillText(text.word, text.x + 25, text.y + 74);    
}

function drawWord(pos, error) {
    if(pos === text.errors[pos] && error === 0) {
        ctx.fillStyle = '#00ff00';
    }
    else {
        ctx.fillStyle = '#ff0000';
    }
    ctx.fillText(text.word, text.x + 25, text.y + 74);
    
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    player.x += player.dx;
    player.y += player.dy;
    text.x = player.x;
    text.y = player.y;
    detectWalls();
}

function detectWalls() {
    
    if(player.x < 0) {
        player.x = 0;
    }
    
    if(player.x + player.w > canvas.width) {
        player.x = canvas.width - player.w;
    }
    
    if(player.y < 0) {
        player.y = 0;
    }
    
    if(player.y + player.h > canvas.height) {
        player.y = canvas.height - player.h;
    }

}

function update() {
    clear();
    drawPlayer();    
    newPos();
    requestAnimationFrame(update);
}

function checkInput(e) {
    
    if(e.key === text.word.charAt(pos)) {        
        text.errors.push(0);
        drawWord(pos, 0);
        pos++;        
    }
    else {
        text.errors.push(1);
        drawWord(pos, 1);
        pos++;
    }
        
}

function moveUp() {
    player.dy = -player.speed;
}

function moveDown() {
    player.dy = player.speed;
}

function moveRight() {
    player.dx = player.speed;
}

function moveLeft() {
    player.dx = -player.speed;
}

function keyDown(e) {

    if(e.key === 'ArrowRight' || e.key === 'Right') {
        moveRight();
    }
    else if(e.key === 'ArrowLeft' || e.key === 'Left') {
        moveLeft();
    }
    if(e.key === 'ArrowUp' || e.key === 'Up') {
        moveUp();
    }
    else if(e.key === 'ArrowDown' || e.key === 'Down') {
        moveDown();    
    }

}

function keyUp(e) {
    
    if (
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Up' ||
        e.key === 'ArrowUp' ||
        e.key === 'Down' ||
        e.key === 'ArrowDown'
    ) {
        player.dx = 0;
        player.dy = 0;
    }

}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', checkInput);