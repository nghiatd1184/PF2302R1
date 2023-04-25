class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class UserScore {
    constructor(userName, score) {
        this.UserName = userName;
        this.Score = score;
    }
}

let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let highestScore = document.getElementById("highestScore");
let move, max, headup, headdown, headleft, headright, tailup, taildown, tailleft, tailright, appleImg, bodyright, bodyleft, leftup, rightup, leftdown, rightdown;
let appleLocationX, appleLocationY, gameMode, userName;
let startBtn = document.getElementById("buttonStart");
let playBtn = document.getElementById("buttonPlay");
let gameDiv = document.getElementById("gameDiv");
let gameForm = document.getElementById("gameForm");
let direction = 'up';
let appleEated = false;
let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
let snake = [];
let bang = document.getElementById("bxh");

loadImage();

function loadImage() {
    appleImg = new Image();
    appleImg.src = 'apple.png';
    headup = new Image();
    headup.src = 'headup.png';
    headdown = new Image();
    headdown.src = 'headdown.png';
    headleft = new Image();
    headleft.src = 'headleft.png';
    headright = new Image();
    headright.src = 'headright.png';
    tailup = new Image();
    tailup.src = 'tailup.png';
    taildown = new Image();
    taildown.src = 'taildown.png';
    tailleft = new Image();
    tailleft.src = 'tailleft.png';
    tailright = new Image();
    tailright.src = 'tailright.png';
    bodyright = new Image();
    bodyright.src = 'bodyright.png';
    bodyup = new Image();
    bodyup.src = 'bodyup.png';
    leftup = new Image();
    leftup.src = 'leftup.png';
    leftdown = new Image();
    leftdown.src = 'leftdown.png';
    rightdown = new Image();
    rightdown.src = 'rightdown.png';
    rightup = new Image();
    rightup.src = 'rightup.png';
}

function playGame() {
    userName = document.getElementById("userName").value;
    gameMode = document.getElementById("gameMode").value;
    if (userName === "" || gameMode === "") {
        alert("Vui lòng nhập tên người chơi và chọn độ khó!")
    } else {
        gameForm.style.display = "none";
        gameDiv.style.display = "block";
    }
    bang.innerHTML = "";
    for (let i = 0; i < gameHistory.length; i++) {
        let taoDong = document.createElement("tr");
        let taoCot1 = document.createElement("td");
        taoCot1.innerHTML = gameHistory[i].UserName;
        let taoCot2 = document.createElement("td");
        taoCot2.innerHTML = gameHistory[i].Score;
        taoDong.appendChild(taoCot1);
        taoDong.appendChild(taoCot2);
        bang.appendChild(taoDong);
    }
}

function drawSnake() {
    ctx.clearRect(0, 0, 600, 600);
    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            if (snake[i].x === snake[i+1].x && snake[i].y > snake[i+1].y) {
                ctx.drawImage(headdown, snake[i].x, snake[i].y);
            } else if (snake[i].x === snake[i+1].x && snake[i].y < snake[i+1].y) {
                ctx.drawImage(headup, snake[i].x, snake[i].y);
            } else if (snake[i].x < snake[i+1].x && snake[i].y === snake[i+1].y) {
                ctx.drawImage(headleft, snake[i].x, snake[i].y);
            } else if (snake[i].x > snake[i+1].x && snake[i].y === snake[i+1].y) {
                ctx.drawImage(headright, snake[i].x, snake[i].y);
            }
        } else if (i === snake.length - 1) {
            if (snake[i].x === snake[i-1].x && snake[i].y > snake[i-1].y) {
                ctx.drawImage(tailup, snake[i].x, snake[i].y);
            } else if (snake[i].x === snake[i-1].x && snake[i].y < snake[i-1].y) {
                ctx.drawImage(taildown, snake[i].x, snake[i].y);
            } else if (snake[i].x < snake[i-1].x && snake[i].y === snake[i-1].y) {
                ctx.drawImage(tailright, snake[i].x, snake[i].y);
            } else if (snake[i].x > snake[i-1].x && snake[i].y === snake[i-1].y) {
                ctx.drawImage(tailleft, snake[i].x, snake[i].y);
            }
        } else {
            if (snake[i].x === snake[i-1].x && snake[i].x === snake[i+1].x) {
                ctx.drawImage(bodyup, snake[i].x, snake[i].y);
            } else if (snake[i].y === snake[i-1].y && snake[i].y === snake[i+1].y) {
                ctx.drawImage(bodyright, snake[i].x, snake[i].y);
            } else if ((snake[i].x === snake[i-1].x && snake[i].y === snake[i+1].y && snake[i-1].x > snake[i+1].x && snake[i-1].y < snake[i+1].y) || (snake[i].x === snake[i+1].x && snake[i].y === snake[i-1].y && snake[i-1].x < snake[i+1].x && snake[i-1].y > snake[i+1].y)) {
                ctx.drawImage(rightup, snake[i].x, snake[i].y);
            } else if ((snake[i].x === snake[i-1].x && snake[i].y === snake[i+1].y && snake[i-1].x < snake[i+1].x && snake[i-1].y < snake[i+1].y) || (snake[i].x === snake[i+1].x && snake[i].y === snake[i-1].y && snake[i-1].x > snake[i+1].x && snake[i-1].y > snake[i+1].y)) {
                ctx.drawImage(leftup, snake[i].x, snake[i].y);
            } else if ((snake[i].x === snake[i-1].x && snake[i].y === snake[i+1].y && snake[i-1].x > snake[i+1].x && snake[i-1].y > snake[i+1].y) || (snake[i].x === snake[i+1].x && snake[i].y === snake[i-1].y && snake[i-1].x < snake[i+1].x && snake[i-1].y < snake[i+1].y)) {
                ctx.drawImage(rightdown, snake[i].x, snake[i].y);
            } else if ((snake[i].x === snake[i-1].x && snake[i].y === snake[i+1].y && snake[i-1].x < snake[i+1].x && snake[i-1].y > snake[i+1].y) || (snake[i].x === snake[i+1].x && snake[i].y === snake[i-1].y && snake[i-1].x > snake[i+1].x && snake[i-1].y < snake[i+1].y)) {
                ctx.drawImage(leftdown, snake[i].x, snake[i].y);
            }
        }
    }
}

function controlSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[(i-1)].x;
        snake[i].y = snake[(i-1)].y;
    }
    if (direction === 'up') {
        snake[0].y -= 20;
    }
    if (direction === 'down') {
        snake[0].y += 20;
    }
    if (direction === 'left') {
        snake[0].x -= 20;
    }
    if (direction === 'right') {
        snake[0].x += 20;
    }
}

function checkAppleLocation() {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === appleLocationX && snake[i].y === appleLocationY) {
            return appleLocation = false;
        }
    }
    return appleLocation = true;
}

function randomApple() {
    if (appleEated) {
        while (checkAppleLocation() === false) {
            appleLocationX = Math.floor(Math.random()*30) * 20; 
            appleLocationY = Math.floor(Math.random()*30) * 20;
        }
        appleEated = false;
    }
    ctx.beginPath();
    ctx.drawImage(appleImg, appleLocationX, appleLocationY);
}

function eatApple() {
    if (snake[0].x === appleLocationX && snake[0].y === appleLocationY) {
        if (snake[snake.length-1].x === snake[snake.length-2].x && snake[snake.length-1].y > snake[snake.length-2].y) {
            snake.push(new  Snake(snake[snake.length-1].x, snake[snake.length - 1].y + 20));
        }
        if (snake[snake.length-1].x === snake[snake.length-2].x && snake[snake.length-1].y < snake[snake.length-2].y) {
            snake.push(new  Snake(snake[snake.length-1].x, snake[snake.length - 1].y - 20));
        }
        if (snake[snake.length-1].y === snake[snake.length-2].y && snake[snake.length-1].x < snake[snake.length-2].x) {
            snake.push(new  Snake(snake[snake.length-1].x - 20, snake[snake.length - 1].y));
        }
        if (snake[snake.length-1].y === snake[snake.length-2].y && snake[snake.length-1].x > snake[snake.length-2].x) {
            snake.push(new  Snake(snake[snake.length-1].x + 20, snake[snake.length - 1].y));
        }
        appleEated = true;
        document.getElementById("score").innerHTML =`<img src="appleScore.png"> ${snake.length - 3}`;
    }
}

function gameOver() {
    if (snake[0].x >= 600 || snake[0].x < 0 || snake[0].y < 0 || snake[0].y >= 600) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y ) {
        return true;
        }
    }
    return false;
}

onkeydown = function(e) {
            let key = e.keyCode;
            if (key === 38 && direction !== 'down') {
               direction = 'up';
            }
            if (key === 40 && direction !== 'up') {
               direction = 'down';
            }
            if (key === 37 && direction !== 'right') {
               direction = 'left';
            }
            if (key === 39 && direction !== 'left') {
               direction = 'right';
            }
//up = 38, down = 40, left = 37, right = 39
}

function gameCycle() {
    if (gameOver()) {
        clearInterval(move);
        ctx.clearRect(0, 0, 600, 600);
        ctx.beginPath();
        ctx.font = 'bold 60pt Comic Sans MS';
        ctx.fillStyle = '#d22f42';
        ctx.fillText('GAMEOVER', 73, 320);
        gameHistory.push(new UserScore(userName, snake.length - 3));
        console.log(gameHistory);
        gameHistory.sort(function (a, b) {return b.Score - a.Score});
        highestScore.innerHTML = `<img src="trophy.png"> ${gameHistory[0].Score}`;
        bang.innerHTML = "";
        for (let i = 0; i < gameHistory.length; i++) {
            let taoDong = document.createElement("tr");
            let taoCot1 = document.createElement("td");
            taoCot1.innerHTML = gameHistory[i].UserName;
            let taoCot2 = document.createElement("td");
            taoCot2.innerHTML = gameHistory[i].Score;
            taoDong.appendChild(taoCot1);
            taoDong.appendChild(taoCot2);
            bang.appendChild(taoDong);
        }
        localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
    } else {
        drawSnake();
        randomApple();
        controlSnake();
        eatApple();
    }
}

function startGame() {
    move = null;
    appleLocationX = Math.floor(Math.random()*30) * 20; 
    appleLocationY = Math.floor(Math.random()*30) * 20;
    console.log();
    while (checkAppleLocation() === false) {
        appleLocationX = Math.floor(Math.random()*30) * 20; 
        appleLocationY = Math.floor(Math.random()*30) * 20;
    }
    direction = 'up';
    appleEated = false;
    snake = [];
    snake.push(new  Snake(300, 300));
    snake.push(new  Snake(300, 320));
    snake.push(new  Snake(300, 340));
    if (gameMode === "easyMode") {
        move = setInterval(gameCycle,250);
    } else if (gameMode === "normalMode") {
        move = setInterval(gameCycle,150);
    } else {
        move = setInterval(gameCycle,50);
    }

}
