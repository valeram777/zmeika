const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
document.addEventListener("keydown", keyPuss);
const ww = document.querySelector(".Kr")
const snake1 = new Image();
const et = new Image();
const bg = new Image();
let speed = 100;
snake1.src = "img/snake.png";
et.src = "img/hot.png"

bg.src = "img/bg.jpg";
let dir = "";
let head = {}
let score = 0;
const arr = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

];

let snakeBody = [{ x: 150, y: 350 }, { x: 150, y: 400 }]; //0,0
let eat = { x: (Math.floor(Math.random() * 13 + 1) * 50), y: (Math.floor(Math.random() * 11 + 1) * 50) };
let eatc = { x: 0, y: 0 };
let sX;
let sY;
function eatSome(head) {
    for (let v = 0; v < snakeBody.length; v++) {
        if (sX == snakeBody[v].x && sY == snakeBody[v].y) {
            clearInterval(canvas);
        }
    }
}
function teal() {
    head = { x: sX, y: sY };
    snakeBody.unshift(head)
   // snakeBody.pop();
    //sn2();
   // sn()
}

function eatF() {
    eat = { x: (Math.floor(Math.random() * 13 + 1) * 50), y: (Math.floor(Math.random() * 11 + 1) * 50) };
    ctx.drawImage(et, 2, 0, 110, 110, eat.x, eat.y, 50, 50)
}

function sn() {
    for (let i = 0; i < snakeBody.length; i++) {
        if (i == 0) {

            ctx.drawImage(snake1, 2, 0, 35, 35, snakeBody[i].x, snakeBody[i].y, 50, 50);
        } else {
            ctx.drawImage(snake1, 110, 0, 35, 35, snakeBody[i].x, snakeBody[i].y, 50, 50);
        }
    }
}

function sn2() {
    head = { x: sX, y: sY };
    if (sX == 0 || sX == 700 || sY == 0 || sY == 600) {
        clearInterval(canvas);
    }
  
    eatSome(head);
    snakeBody.pop();
    snakeBody.unshift(head)
}

function keyPuss(event) {
    if (event.keyCode == 38 && dir != "down") {
        dir = "up"
    } else if (event.keyCode == 40 && dir != "up") {
        dir = "down"
    } else if (event.keyCode == 37 && dir != "right") {
        dir = "left"
    } else if (event.keyCode == 39 && dir != "left") {
        dir = "right"
    } else if (event.keyCode == 19) {
        clearInterval(canvas);
    }
}



function draw() {
    let i;
    for (i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (j < arr[i].length) {
                if (arr[i][j] < 1) {
                    ctx.drawImage(bg, 495, 20, 10, 10, ((j * 5)) + '0', ((i * 5)) + '0', 50, 50);
                } else {
                    ctx.drawImage(bg, 400, 50, 10, 10, ((j * 5)) + '0', ((i * 5)) + '0', 50, 50);
                }
            }
        }
    } // Рисует игровое поле
    console.log(canvas);
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, 63, 40);
    ctx.drawImage(et, 2, 0, 110, 110, eat.x, eat.y, 50, 50)
    ctx.drawImage(et, 2, 0, 110, 110, eatc.x, eatc.y, 50, 50) //еда
    sn();
    // eat()
    sX = snakeBody[0].x;
    sY = snakeBody[0].y;
    if (dir == "up") {
        sY -= 50;
       sn2();
    } else if (dir == "down") {
        sY += 50;
       sn2();
    } else if (dir == "left") {
        sX -= 50;
       sn2();
    } else if (dir == "right") {
        sX += 50;
        sn2();
    }
    
    if (sX == 0 || sX == 700 || sY == 0 || sY == 600) {
        clearInterval(canvas);
    } else if (sX == eat.x && sY == eat.y) {
        score++;
        teal();
        eatF();
    }
}

bg.onload = draw;
let canvas = setInterval(draw, speed);