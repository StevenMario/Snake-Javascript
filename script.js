const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d'); 
let box = 20;
let snake = [];
snake[0] = {x: 10*box, y:10*box};
let food ={
    x:Math.floor(Math.random()*15 +1)*box,
    y:Math.floor(Math.random()*15 +1)*box
};

let score = 0;
let d;
document.addEventListener("keydown",direction);
function direction(event){
    let key = event.keyCode;
    if(key == 37 &&  d != "RIGHT"){
        d="LEFT";
    }else if(key == 38 && d != "DOWN"){
        d="up";
    }else if(key == 37 && d != "LEFT"){
        d="RIGHT";
    }else if(key == 37 && d != "UP"){
        d="DOWN";
    }
}
function draw(){
    ctx.clearRect(0,0,400,400);
    for(let i = 0;i<snake.length;i++){
        ctx.fillStyle=(i==0)?"green":"white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle="red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.fillStyle ="orange";
    ctx.fillRect(food.x,food.y,box,box);

    let snakeX=snake[0].x;
    let snakeY=snake[0].y;

    if(d=="LEFT") snakeX-=box;
    if(d=="UP") snakeX-=box;
    if(d=="RIGHT") snakeX+=box;
    if(d=="DOWN") snakeX+=box;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food={
            x:Math.floor(Math.random()*15 +1)*box,
            y:Math.floor(Math.random()*15 +1)*box
        }
    } else{
        snake.pop();
    }
    let newHead ={
        x: snakeX,
        y: snakeY
       };
       
       if(snakeX < 0 || snakeY < 0 || snakeX > 19*box ||snakeY> 19*box || collision(newHead,snake)){
           clearInterval(game);
       }
       snake.unshift(newHead);
       ctx.fillstyle = "red";
       ctx.font="30px Arial";
       ctx.fillText(score,2*box,1.6*box);
}
function collision(head,array){
    for (let j=0 ;j<array.length;j++){
        if(head.x == array[j].x && head.y == array[j].y){
            return true;
        }
    }
    return false;
}
let game = setinterval(draw,100);




