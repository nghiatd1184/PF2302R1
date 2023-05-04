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
let bang = document.getElementById("bxh");
let startBtn = document.getElementById("buttonStart");
let playBtn = document.getElementById("buttonPlay");
let soundBtn = document.getElementById("soundCtrl");
let giaoDienGame = document.getElementById("giaoDienGame");
let formDangKy = document.getElementById("formDangKy");
let junglehemeSound = document.getElementById("jungleThemeSound");
let yasuoThemeSound = document.getElementById("yasuoThemeSound");
let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
let snake = [];
let randomDirection = ['up', 'left', 'right'];
let yasuoMoveDistance = 4;
let snakeMove, max, headUp, headDown, headLeft, headRight, tailUp, tailDown, tailLeft, tailRight, appleImg, bodyRight, bodyLeft, leftUp, rightUp, leftDown, rightDown, appleLocationX, appleLocationY, gameMode, userName, yasuoOver, xPre, yPre, yasuoLocationX, yasuoLocationY, yasuo, warning, run, direction, yasuoAddOn;
let preDirection = direction;
let preOfPreDirection;

//hàm cho nút quay lại form đăng ký
function backToForm() {
    formDangKy.style.display = "block";
    giaoDienGame.style.display = "none";
    document.getElementById("userName").value = "";
    document.getElementById("userName").focus();
    document.getElementById("gameMode").value = "";
    startBtn.className = "buttonStart";
    if (yasuoAddOn.checked) {
        yasuoThemeSound.pause();
    } else {
        jungleThemeSound.pause();
    }
    controlsAudio();
    ctx.clearRect(0, 0, 600, 600);
}

//hàm cho nút vào giao diện game
function goToGameInterface() {
    userName = document.getElementById("userName").value;
    gameMode = document.getElementById("gameMode").value;
    if (userName === "" || gameMode === "") {
        alert("Vui lòng nhập tên người chơi và chọn độ khó!")
    } else {
        formDangKy.style.display = "none";
        giaoDienGame.style.display = "block";
        drawRanking();
        yasuoAddOn = document.getElementById("yasuoAddOn");
        if (yasuoAddOn.checked) {
            yasuoThemeSound.play();
            yasuoThemeSound.volume = 0.3;
        } else {
            jungleThemeSound.play();
            jungleThemeSound.volume = 0.3;
        }
    }
}

//hàm điều khiển âm thanh và nút điều khiển âm thanh
function controlsAudio() {
    if (yasuoAddOn.checked) {
        yasuoThemeSound.muted = !yasuoThemeSound.muted;
    } else {
        jungleThemeSound.muted = !jungleThemeSound.muted;
    }
    if (soundBtn.className === "soundBtn") {
        soundBtn.className = "soundOffBtn";
    } else {
        soundBtn.className = "soundBtn";
    }
}

//hàm cho nút pop-up
function showPopup() {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

//hàm vẽ bảng xếp hạng
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

//hàm gọi hình ảnh
function loadImage() {
    yasuo = new Image();
    yasuo.src = "./images/yasuoRunning.png";
    warning = new Image();
    warning.src = "./images/warning.png";
    yasuoOver = new Image();
    yasuoOver.src = './images/gameOver.png';
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
loadImage();

// hàm check va chạm của chướng ngại vật
function isCollision(x, y) {
    let distX = Math.abs((yasuoLocationX + 50) - (x + 10));
    let distY = Math.abs((yasuoLocationY + 39) - (y + 10));
    return (distX <= 60 && distY <= 49);
}

//hàm chạy chướng ngại vật
function runningYasuo() {
    if (isCollision(appleLocationX, appleLocationY)) {
        document.getElementById("yasuoCollisionApple").play();
        ctx.clearRect(appleLocationX, appleLocationY, 20, 20);
        randomApple();
    }
    ctx.clearRect(yasuoLocationX, yasuoLocationY, 100, 80);
    if (yasuoLocationX >= -101) {
        yasuoLocationX += yasuoMoveDistance;
    }
    if (yasuoLocationX >= 601 || gameOver()) {
        return;
    }
    ctx.drawImage(yasuo, yasuoLocationX, yasuoLocationY);
    setTimeout(arguments.callee, 2);
}

//hàm cảnh báo chướng ngại vật sắp chạy
function yasuoComing() {
    yasuoLocationX = -101;
    yasuoLocationY = (Math.floor(Math.random()*27) * 20) + 1;
    document.getElementById("yasuoWaring").play();
    ctx.drawImage(warning, 0, yasuoLocationY);
    setTimeout(function () {
        if (gameOver()) {
            return;
        }
        ctx.clearRect(0, yasuoLocationY, 20, 80);
        runningYasuo();
    }, 3000);
}

//hàm điều khiển hướng chạy của rắn
function controlSnake() {
    xPre = snake[snake.length-1].x;
    yPre = snake[snake.length-1].y;
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[(i-1)].x;
        snake[i].y = snake[(i-1)].y;
    }
    if (direction === 'up') {
        snake[0].y -= 20;
    } else if (direction === 'down') {
        snake[0].y += 20;
    } else if (direction === 'left') {
        snake[0].x -= 20;
    } else if (direction === 'right') {
        snake[0].x += 20;
    }
}

//hàm vẽ rắn
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

//hàm check vị trí quả táo có trùng vào thân rắn không
function checkAppleLocation() {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === appleLocationX && snake[i].y === appleLocationY) {
            return appleLocation = true;
        }
    }
    return appleLocation = false;
}

//hàm vẽ vị trí ngẫu nhiên của quả táo
function randomApple() {
    appleLocationX = Math.floor(Math.random()*30) * 20; 
    appleLocationY = Math.floor(Math.random()*30) * 20;
    while (checkAppleLocation()) {
        appleLocationX = Math.floor(Math.random()*30) * 20; 
        appleLocationY = Math.floor(Math.random()*30) * 20;
    }
    ctx.beginPath();
    ctx.drawImage(appleImg, appleLocationX, appleLocationY);
}

//hàm check con rắn đã ăn quả táo chưa
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
        document.getElementById("appleEatedSound").play();
        randomApple();
        document.getElementById("score").innerHTML =`<img src="./images/appleScore.png"> ${snake.length - 3}`;
    }
}

//hàm check điều kiện gameover
function gameOver() {
    if (snake[0].x >= 600 || snake[0].x < 0 || snake[0].y < 0 || snake[0].y >= 600) {
        document.getElementById("gameOverSound").play();
        return true;
    }
    for (let i = 0; i < snake.length - 1; i++) {
        if (snake[0].x === snake[i+1].x && snake[0].y === snake[i+1].y ) {
            document.getElementById("gameOverSound").play();
            return true;
        }
        if (isCollision(snake[i].x, snake[i].y)) {
            document.getElementById("yasuoGameOver").play();
            return true;
        }
    }
    return false;
}

//chu trình game
function gameCycle() {
    if (gameOver()) {
        clearInterval(run);
        startBtn.className = "buttonRestart";
        ctx.clearRect(0, 0, 600, 600);
        if (yasuoAddOn.checked) {
            ctx.beginPath();
            ctx.drawImage(yasuoOver, 0, 80);
        } else {
            ctx.beginPath();
            ctx.font = 'bold 60pt Comic Sans MS';
            ctx.fillStyle = '#d22f42';
            ctx.fillText('GAMEOVER', 73, 320);
        }
        gameHistory.push(new UserScore(userName, snake.length - 3, gameMode));
        localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
        drawRanking();
        startBtn.disabled = false;
        console.log(gameHistory);
        clearInterval(snakeMove);
    } else {
        eatApple();
        drawSnake();
        controlSnake();
    }
}

//hàm cho nút bắt đầu game
function startGame() {
    snakeMove = null;
    ctx.clearRect(0, 0, 600, 600);
    startBtn.disabled = true;
    yasuoLocationX = -101;
    yasuoLocationY = (Math.floor(Math.random()*27) * 20) + 1;
    document.getElementById("gameStartSound").play();
    randomApple();
    direction = randomDirection[Math.floor(Math.random()*3)];
    snake = [];
    snake.push(new  Snake(300, 300));
    snake.push(new  Snake(300, 320));
    snake.push(new  Snake(300, 340));
    if (gameMode === "easyMode") {
        snakeMove = setInterval(gameCycle,200);
    } else if (gameMode === "normalMode") {
        snakeMove = setInterval(gameCycle,150);
    } else {
        snakeMove = setInterval(gameCycle,80);
    }
    if (yasuoAddOn.checked) {
        if (gameMode === "easyMode") {
            run = setInterval(yasuoComing, 40000);
        } else if (gameMode === "normalMode") {
            run = setInterval(yasuoComing, 20000);
        } else {
            run = setInterval(yasuoComing, 10000);
        }
    }
}

//điều hướng con rắn bằng nút mũi tên
onkeydown = function(k) {
    preDirection = direction;
    if (k.key === "ArrowUp" && direction !== 'down') {
        direction = 'up';
        preOfPreDirection = 
    } else if (k.key === "ArrowDown" && direction !== 'up') {
        direction = 'down';
    } else if (k.key === "ArrowLeft" && direction !== 'right') {
        direction = 'left';
    } else if (k.key === "ArrowRight" && direction !== 'left') {
        direction = 'right';
    }
    if (k.key === "ArrowUp" || k.key === "ArrowDown" || k.key === "ArrowLeft" || k.key === "ArrowRight") {
        document.getElementById("snakeMovingSound").play();
    }
}