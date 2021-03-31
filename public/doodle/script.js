
const grid = document.querySelector(".grid");
const jumper = document.createElement("div");

let jumperLeft = 175;
let jumperBottom = 200;
let isGameOver = false
let platCount = 4;
let plats = []
let upTimerId
let downTimerId
let platBeg = true;
let isJumping = false;
let startPoint = 200;
let isLeft = false;
let isRight = false;
let leftTimerId
let rightTimerId
let scoreDisplay = document.querySelector(".score");
let score = 0;



function spawnJumper(){
    grid.appendChild(jumper);
    jumper.classList.add("jumper");
    jumperLeft = plats[0].left; 
    jumper.style.left = jumperLeft + 'px';
    jumper.style.bottom = jumperBottom + 'px';
}


class Platform {
    constructor(newPlatBottom){
        this.bottom = newPlatBottom;
        this.left = Math.random() * 315
        this.visual = document.createElement('div')

        const visual = this.visual 
        visual.classList.add('platform');
        visual.style.left = this.left +'px'
        visual.style.bottom = this.bottom + 'px'
        grid.appendChild(visual)
    }
}

function spawnPlats(){
    for (let i=0; i < platCount; i++) {
            let platGap = 600 / platCount;
            let newPlatBottom = 200 + i * platGap;
            let newPlat = new Platform(newPlatBottom)
            plats.push(newPlat);
            console.log('ass')
    }
}

function movePlats(){
    if (jumperBottom > 150){
        plats.forEach(plat => {
            plat.bottom -= 4;
            let visual = plat.visual;
            visual.style.bottom = plat.bottom +'px';

            if (plat.bottom < 10) {
                let firstPlatform = plats[0].visual;
                firstPlatform.classList.remove('platform')
                plats.shift();
                
                let newPlat = new Platform(600)
                plats.push(newPlat)
                score++;
                scoreDisplay.innerHTML = score;
            }
        })
    }
}

function jump() {
    clearInterval(downTimerId)
    isJumping = true;
    upTimerId = setInterval(function() {
        jumperBottom += 15;
        jumper.style.bottom = jumperBottom +'px'
        if (jumperBottom > startPoint+200) {
            fall();
        }
    },30)
}

function fall(){
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(function () {
        jumperBottom -= 5;
        jumper.style.bottom = jumperBottom + 'px';
        console.log('whoa!')
        if (jumperBottom <= 0){
            gameOver();
        }
        plats.forEach(plat => {
            if(
                (jumperBottom >= plat.bottom) &&
                (jumperBottom <= plat.bottom + 15) &&
                ((jumperLeft +60) >= plat.left) &&
                (jumperLeft <= (plat.left + 80)) &&
                !isJumping
            ){
                console.log('landed');
                startPoint = jumperBottom;
                jump();
            }

        })
    })
}


function gameOver() {
    console.log('gameOver');
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    moveStraight();
    document.removeEventListener('keydown', control)
}

function control(e) {
    console.log(e.key)
    if (e.key === "ArrowLeft" || e.key === 'a') {
        moveLeft()
    } else if (e.key ==="ArrowRight" || e.key === "d"){
        moveRight()
    } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "ArrowDown" || e.key === "s") {
        moveStraight();
    }
}

function moveLeft() {
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)

    isLeft = true;
    leftTimerId = setInterval(function() {
        if (jumperLeft >= 0) {
        jumperLeft -=10;
        jumper.style.left = jumperLeft + 'px';
        } else moveStraight()
    },30)
}

function moveRight () {
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)
    
    isRight = true;
    rightTimerId = setInterval(function () {
        if (jumperLeft <= 350) {
            jumperLeft += 10;
            jumper.style.left = jumperLeft +'px'
        } else moveStraight();
    },30)
}

function moveStraight(){
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)
    isLeft = false;
    isRight = false;
}

function startGame(){
    if (isGameOver == false){
        score = 0;
        spawnPlats();
        spawnJumper();
        setInterval(movePlats, 30);
        jump();
        document.addEventListener('keydown', control)
    }
}
startGame()