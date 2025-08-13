const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
//ctx.fillRect(part.x, part.y, boxSize, boxSize);
const boxSize = 20;
//let gameInterval = null;
let gameOver = false;
let score = 0;
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
    //积分
    if(head.x === food.x && head.y === food.y){
        score++;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
    

}
function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
//积分函数
function drawScore(){
    ctx.fillStyle ="black";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score,10,20);
}

function gameLoop(){
    clearCanvas();
    drawScore();
    drawFood();
    moveSnake();
    

    if(chackCollision()){
        gameOver = true;
        
        clearInterval(gameInterval);
        ctx.fillStyle = "black";
        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 10);
        ctx.font = "16px sans-serif";
        ctx.fillText("按空格重新开始", canvas.width / 2, canvas.height / 2 + 10);
        return ;
    }

    drawSnake();
}
let gameInterval = setInterval(gameLoop,150);
//重新开始游戏的触发
document.addEventListener("keydown",changeDirection);
document.addEventListener("keydown",function(e){
    if(e.code === "Space" && gameOver){
        gameOver = false;
        restartGame();
    }
});

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
    const head = snake[0];
    //撞墙
    if(head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height){
        return true;
    }
    //撞到自己
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === head.x && snake[i].y === head.y){
            return true;
        }
    }
    return false;
}
//重新开始游戏
function restartGame(){
    snake = [
        {x:160,y:200},
        {x:140,y:200},
        {x:120,y:200}
    ];
    dx = boxSize;
    score = 0;
    food = getRandomFoodPosition();
    gameInterval = setInterval(gameLoop, 150);
}