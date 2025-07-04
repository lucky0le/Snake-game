const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
//ctx.fillRect(part.x, part.y, boxSize, boxSize);
const boxSize = 20;
let snake = [
    {x:160,y:200},
    {x:140,y:200},
    {x:120,y:200}
];
let dx = boxSize;
let dy = 0;
function drawPart(part){
    ctx.fillStyle = "green";
    ctx.fillRect(part.x,part.y,boxSize,boxSize)
}
function drawSnake(){
    snake.forEach(drawPart)
}
function moveSnake(){
    const head = {
        x:snake[0].x + dx,
        y:snake[0].y +dy,
    };
    snake.unshift(head);
    if(head.x === food.x && head.y === food.y){
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}
function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
function gameLoop(){
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
}
setInterval(gameLoop,150);
document.addEventListener("keydown",changeDirection);
function changeDirection(event) {
    const key = event.key;
    const goingUp = dy === -boxSize;
    const goingDown = dy === boxSize;
    const goingRight = dx === boxSize;
    const goingLeft = dx === -boxSize;
    if(key === "ArrowUp" && !goingDown){
        dx  =0;
        dy = -boxSize;
    } else if(key === "ArrowDown" && !goingUp){
        dx = 0;
        dy = boxSize;
    }
    else if(key === "ArrowLeft" && !goingRight){
        dx = -boxSize;
        dy = 0;
    }
    else if(key === "ArrowRight" && !goingLeft){
        dx = boxSize;
        dy = 0;
    }
}

let food = getRandomFoodPosition();

function getRandomFoodPosition() {
    const maxX = canvas.width / boxSize;
    const maxY = canvas.height / boxSize;
    return {
        x: Math.floor(Math.random() * maxX) * boxSize,
        y: Math.floor(Math.random() * maxY) * boxSize
    };
}

function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize ,boxSize);
}

function chackCollision(){
    con
}