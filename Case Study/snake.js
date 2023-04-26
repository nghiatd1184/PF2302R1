class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class UserScore {
    constructor(userName, score, gameMode) {
        this.UserName = userName;
        this.Score = score;
        this.GameMode = gameMode;
    }
}

let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let highestScore = document.getElementById("highestScore");
let move, max, headUp, headDown, headLeft, headRight, tailUp, tailDown, tailLeft, tailRight, appleImg, bodyRight, bodyLeft, leftUp, rightUp, leftDown, rightDown;
let appleLocationX, appleLocationY, gameMode, userName;
let startBtn = document.getElementById("buttonStart");
let playBtn = document.getElementById("buttonPlay");
let gameDiv = document.getElementById("gameDiv");
let gameForm = document.getElementById("gameForm");
let themeSound = document.getElementById("pageThemeSound");
let soundBtn = document.getElementById("soundCtrl");
let direction = 'up';
let appleEated = false;
let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
let snake = [];
let bang = document.getElementById("bxh");
let xPre, yPre;

loadImage();

function backToForm() {
    gameForm.style.display = "block";
    gameDiv.style.display = "none";
    document.getElementById("userName").value = "";
    document.getElementById("userName").focus();
    document.getElementById("gameMode").value = "";
    startBtn.className = "buttonStart";
}

function controlsAudio() {
    themeSound.muted = !themeSound.muted;
    if (soundBtn.className === "soundBtn") {
        soundBtn.className = "soundOffBtn";
    } else {
        soundBtn.className = "soundBtn";
    }
}

function loadImage() {
    appleImg = new Image();
    appleImg.src = './images/apple.png';
    headUp = new Image();
    headUp.src = './images/headup.png';
    headDown = new Image();
    headDown.src = './images/headdown.png';
    headLeft = new Image();
    headLeft.src = './images/headleft.png';
    headRight = new Image();
    headRight.src = './images/headright.png';
    tailUp = new Image();
    tailUp.src = './images/tailup.png';
    tailDown = new Image();
    tailDown.src = './images/taildown.png';
    tailLeft = new Image();
    tailLeft.src = './images/tailleft.png';
    tailRight = new Image();
    tailRight.src = './images/tailright.png';
    bodyRight = new Image();
    bodyRight.src = './images/bodyright.png';
    bodyUp = new Image();
    bodyUp.src = './images/bodyup.png';
    leftUp = new Image();
    leftUp.src = './images/leftup.png';
    leftDown = new Image();
    leftDown.src = './images/leftdown.png';
    rightDown = new Image();
    rightDown.src = './images/rightdown.png';
    rightUp = new Image();
    rightUp.src = './images/rightup.png';
}

function playGame() {
    userName = document.getElementById("userName").value;
    gameMode = document.getElementById("gameMode").value;
    if (userName === "" || gameMode === "") {
        alert("Vui lòng nhập tên người chơi và chọn độ khó!")
    } else {
        gameForm.style.display = "none";
        gameDiv.style.display = "block";
        drawRanking();
        themeSound.play();
        themeSound.volume = 0.3;
    }
}

function drawRanking() {
    bang.innerHTML = "";
    gameHistory.sort(function (a, b) {return b.Score - a.Score});
    let gameModeText;
    if (gameMode === "easyMode") {
        document.getElementById("gameModeTitle").innerHTML = `BẢNG XẾP HẠNG<br>DỄ`;
        gameModeText = "Dễ";
    } else if (gameMode === "normalMode") {
        document.getElementById("gameModeTitle").innerHTML = `BẢNG XẾP HẠNG<br>THƯỜNG`;
        gameModeText = "Thường";
    } else {
        document.getElementById("gameModeTitle").innerHTML = `BẢNG XẾP HẠNG<br>KHÓ`;
        gameModeText = "Khó";
    }
    let count = 0;
    for (let i = 0; i < gameHistory.length; i++) {
        if (gameHistory[i].GameMode === gameMode) {
            let taoDong = document.createElement("tr");
            let taoCot1 = document.createElement("td");
            let taoCot2 = document.createElement("td");
            let taoCot3 = document.createElement("td");
            taoCot1.innerHTML = gameHistory[i].UserName;
            taoCot2.innerHTML = gameHistory[i].Score;
            taoCot3.innerHTML = gameModeText;
            taoDong.appendChild(taoCot1);
            taoDong.appendChild(taoCot2);
            taoDong.appendChild(taoCot3);
            bang.appendChild(taoDong);
            count++;
        }
        if (count === 14) {
            break;
        }
    }
}

function drawSnake() {
    ctx.clearRect(xPre, yPre, 20, 20);
    for (let i = 0; i < snake.length; i++) {
        ctx.clearRect(snake[i].x, snake[i].y, 20, 20);
    }
    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            if (snake[i].x === snake[i+1].x && snake[i].y > snake[i+1].y) {
                ctx.drawImage(headDown, snake[i].x, snake[i].y);
            } else if (snake[i].x === snake[i+1].x && snake[i].y < snake[i+1].y) {
                ctx.drawImage(headUp, snake[i].x, snake[i].y);
            } else if (snake[i].x < snake[i+1].x && snake[i].y === snake[i+1].y) {
                ctx.drawImage(headLeft, snake[i].x, snake[i].y);
            } else if (snake[i].x > snake[i+1].x && snake[i].y === snake[i+1].y) {
                ctx.drawImage(headRight, snake[i].x, snake[i].y);
            }
        } else if (i === snake.length - 1) {
            if (snake[i].x === snake[i-1].x && snake[i].y > snake[i-1].y) {
                ctx.drawImage(tailUp, snake[i].x, snake[i].y);
            } else if (snake[i].x === snake[i-1].x && snake[i].y < snake[i-1].y) {
                ctx.drawImage(tailDown, snake[i].x, snake[i].y);
            } else if (snake[i].x < snake[i-1].x && snake[i].y === snake[i-1].y) {
                ctx.drawImage(tailRight, snake[i].x, snake[i].y);
            } else if (snake[i].x > snake[i-1].x && snake[i].y === snake[i-1].y) {
                ctx.drawImage(tailLeft, snake[i].x, snake[i].y);
            }
        } else {
            if (snake[i].x === snake[i-1].x && snake[i].x === snake[i+1].x) {
                ctx.drawImage(bodyUp, snake[i].x, snake[i].y);
            } else if (snake[i].y === snake[i-1].y && snake[i].y === snake[i+1].y) {
                ctx.drawImage(bodyRight, snake[i].x, snake[i].y);
            } else if ((snake[i].x === snake[i-1].x && snake[i].y === snake[i+1].y && snake[i-1].x > snake[i+1].x && snake[i-1].y < snake[i+1].y) || (snake[i].x === snake[i+1].x && snake[i].y === snake[i-1].y && snake[i-1].x < snake[i+1].x && snake[i-1].y > snake[i+1].y)) {
                ctx.drawImage(rightUp, snake[i].x, snake[i].y);
            } else if ((snake[i].x === snake[i-1].x && snake[i].y === snake[i+1].y && snake[i-1].x < snake[i+1].x && snake[i-1].y < snake[i+1].y) || (snake[i].x === snake[i+1].x && snake[i].y === snake[i-1].y && snake[i-1].x > snake[i+1].x && snake[i-1].y > snake[i+1].y)) {
                ctx.drawImage(leftUp, snake[i].x, snake[i].y);
            } else if ((snake[i].x === snake[i-1].x && snake[i].y === snake[i+1].y && snake[i-1].x > snake[i+1].x && snake[i-1].y > snake[i+1].y) || (snake[i].x === snake[i+1].x && snake[i].y === snake[i-1].y && snake[i-1].x < snake[i+1].x && snake[i-1].y < snake[i+1].y)) {
                ctx.drawImage(rightDown, snake[i].x, snake[i].y);
            } else if ((snake[i].x === snake[i-1].x && snake[i].y === snake[i+1].y && snake[i-1].x < snake[i+1].x && snake[i-1].y > snake[i+1].y) || (snake[i].x === snake[i+1].x && snake[i].y === snake[i-1].y && snake[i-1].x > snake[i+1].x && snake[i-1].y < snake[i+1].y)) {
                ctx.drawImage(leftDown, snake[i].x, snake[i].y);
            }
        }
    }
}

function controlSnake() {
    xPre = snake[snake.length-1].x;
    yPre = snake[snake.length-1].y;
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
        document.getElementById("appleEatedSound").play();
        randomApple();
        document.getElementById("score").innerHTML =`<img src="./images/appleScore.png"> ${snake.length - 3}`;
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
    if (key === 38 || key === 37 || key === 39 || key === 40) {
        document.getElementById("snakeMovingSound").play();
    }
//up = 38, down = 40, left = 37, right = 39
}

function gameCycle() {
    if (gameOver()) {
        document.getElementById("gameOverSound").play();
        startBtn.className = "buttonRestart";
        ctx.clearRect(0, 0, 600, 600);
        ctx.beginPath();
        ctx.font = 'bold 60pt Comic Sans MS';
        ctx.fillStyle = '#d22f42';
        ctx.fillText('GAMEOVER', 73, 320);
        gameHistory.push(new UserScore(userName, snake.length - 3, gameMode));
        localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
        drawRanking();
        console.log(gameHistory);
        clearInterval(move);
    } else {
        drawSnake();
        controlSnake();
        eatApple();
    }
}

function startGame() {
    move = null;
    ctx.clearRect(0, 0, 600, 600);
    document.getElementById("gameStartSound").play();
    appleLocationX = Math.floor(Math.random()*30) * 20; 
    appleLocationY = Math.floor(Math.random()*30) * 20;
    while (checkAppleLocation() === false) {
        appleLocationX = Math.floor(Math.random()*30) * 20; 
        appleLocationY = Math.floor(Math.random()*30) * 20;
    }
    randomApple();
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
