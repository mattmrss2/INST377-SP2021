
const highScoreDisplay = document.querySelector(".highScore")
const gamePrompt = document.querySelector(".prompt")
const statusDisplay = document.querySelector(".gameStatus")
const scoreDisplay = document.querySelector(".score")
const bird = document.querySelector(".bird");
const display = document.querySelector(".game");
const ground = document.querySelector(".ground");
const sky = document.querySelector(".sky");

let birdBottom=325;
let birdLeft=195;
let gravity=.3;
let scrollSpeed = 5;
let birdtimerId = null 
let isgameOver = false;
let obstTimerId = undefined;
let obstIntervals = []
let obstacles = []
let score = 0;
let genObstTimer = null 
let isGameStart = false;
let highScore = 0;
document.addEventListener('keydown', control);


function startGame() {
    gravity=.3
    birdBottom = 325
    birdLeft = 195
    score = 0
    scoreDisplay.innerHTML = score
    isGameStart = true;
    isgameOver = false;
    console.log("game start ", bird.style.bottom, bird.style.left)
    bird.style.bottom = "325px"
    bird.style.left = "195px"
    console.log("biiii", bird.style.bottom)
    birdtimerId = setInterval(birdPos, 100)
    genObstTimer = setInterval(genObstacle, 1200)
    
    gamePrompt.innerHTML = ""
    
}

function birdPos() {
    gravity+= .24;
    birdBottom -= gravity**2;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
    if (birdBottom <= 0) {
        gameOver();
    }
    
}
    
function control(e){
    
    if (e.keyCode === 32 && isGameStart === false && isgameOver === false) {
        startGame();
        
    }
    if (e.keyCode === 13 && isGameStart === false && isgameOver === true){
        restartGame();
        console.log("restartGame")
    }
    else if (e.keyCode === 32) {
        jump();
        
    }
    if(e.keyCode === 27) {
        gameOver();
    }

}

function jump() {
    if (birdBottom < 500) {
    birdBottom += 90;
    gravity = .45;
    }
    else if (birdBottom < 600) {
        birdBottom += 600 - birdBottom;
        gravity = .45;
    }
    
}

function genObstacle() {
    function moveObst (){
        obstacleLeft -= scrollSpeed;
        obstacle2Left -=scrollSpeed;
        obstacle.style.left = obstacleLeft + "px";
        obstacle2.style.left = obstacle2Left + "px";

        for(i=0; i < obstacles.length; i++) {
            
            // Retrieving style.left values as ints from array of present obstacle divs prevents bug where if
            // 2 sets of obstacles were on screen, the older pair could not trigger game over
            birdBottomCurrent = parseInt(bird.style.bottom.substring(0,bird.style.bottom.length - 2))
            obstLeftInt = parseInt(obstacles[i].style.left.substring(0, obstacles[i].style.left.length - 2))
            obstHeightInt = parseInt(obstacles[i].style.height.substring(0, obstacles[i].style.height.length - 2)) 
            obst2BottomInt = parseInt(obstacles[i].style.bottom.substring(0,obstacles[i].style.bottom.length - 2)) - 200

            if (obstLeftInt > 115 && obstLeftInt < 255 && birdBottomCurrent < obstHeightInt && obstHeightInt != 1000) {
                gameOver()
                console.log("Bottom End : ", obstacles.length, birdBottom + " : " + obstHeightInt + " : "+birdBottomCurrent, obst2BottomInt)
                break
            }
            if (obstLeftInt > 115 && obstLeftInt < 255 && birdBottomCurrent > obst2BottomInt && obstHeightInt === 1000) {
                gameOver()
                console.log("Top End  " + birdBottom + " : " + obst2BottomInt + " : "+birdBottomCurrent)
                break 
            }
        }
        if(obstacleLeft <= -79){ 
            obstacle.remove()
            obstacle2.remove()
        } 
    }
    let variableHeight = Math.random() * 250 + 100;

    let obstacleLeft = 450;
    let obstacleBottom = 145;

    let obstacle2Bottom = variableHeight + 350;
    let obstacle2Left = 450;

    const obstacle2 = document.createElement("div");
    const obstacle = document.createElement("div");

    obstacle2.style.height = "1000px";
    obstacle2.classList.add("obstacle");
    if (!isgameOver) display.appendChild(obstacle2);
    obstacle2.style.left = obstacle2Left + "px";
    obstacle2.style.bottom = obstacle2Bottom + "px";

    obstacle.style.height = variableHeight + "px";
    obstacle.classList.add("obstacle");
    if (!isgameOver) display.appendChild(obstacle);
    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    obstacles = document.getElementsByClassName("obstacle");    
    obstTimerId = setInterval(moveObst, 20);
    obstIntervals.push(obstTimerId);
    
    if (obstIntervals.length > 1 && parseInt(obstacles[0].style.left.substring(0, obstacles[0].style.left.length - 2)) < 190){
        
        changeScore();
    }
    
    if (obstIntervals.length > 6){
        for(i=0; i < 2; i++) {
            clearInterval(obstIntervals[i])
        }
    }
    
}

function changeScore() {
    
    score++
    scoreDisplay.innerHTML = score
}
function gameOver() {
    for (i=0; i < obstIntervals.length; i++) {
        console.log(obstIntervals + " Moving Intervals")
        clearInterval(obstIntervals[i])
    }
    isgameOver = true;
    isGameStart = false;
    clearInterval(birdtimerId);
    clearInterval(genObstTimer);
    clearInterval(obstTimerId);
    if (score > highScore){
    highScoreDisplay.innerHTML = "Highscore: "+ score
    highScore = score;
    }
    statusDisplay.innerHTML = "Game Over!"
    gamePrompt.innerHTML = "Press enter to play again"

}

function restartGame() {
    console.log(obstacles)
    console.log("Highscore:", highScore, "SCore: ", score)
    let numObstacles = obstacles.length
    statusDisplay.innerHTML = "";
    for (let i =0; i < obstacles.length;) {
        console.log(i, obstacles.length)
        obstacles[i].remove()
    }
    startGame()
}






