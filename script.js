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



