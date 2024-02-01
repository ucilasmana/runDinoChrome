let speedScale=0.025
let scoreValue=0
let gameInterval
let highestScoreValue=0

const startScreenSpan = document.getElementById("start-screen")
const scoreSpan = document.getElementById("score")

const cactusBgDiv = document.getElementById("cactus-bg")
let cactusBgDivChildren= cactusBgDiv.children;

const trackDiv = document.getElementById("track")
const ground = document.getElementById("ground")
const dino = document.getElementById("dino");
const cactusChar = document.getElementById("cactus-char");

//MODAL
const modalDiv= document.getElementById("modal")
const headerMessageSpan= document.getElementById("headerMessage")
const messageSpan = document.getElementById("message")
const yourScoreSpan= document.getElementById("yourScore")
const highestScoreSpan = document.getElementById("highestScore")

highestScoreSpan.innerHTML=highestScoreValue

document.addEventListener("keydown", handleStart, {once:true})

function handleStart() { 

    startScreenSpan.style.setProperty("display", "none")
    scoreSpan.style.setProperty("display", "block")
    

    //Cactus Bg Animation
    cactusBgDiv.style.setProperty("display", "block")
    for (let i = 0; i < cactusBgDivChildren.length; i++) {
        cactusBgDivChildren[i].style.setProperty("animation", "cactus-bg 4s "+ i +"s infinite linear")
    }

    ground.style.setProperty("animation", "ground 1.2s infinite linear")

    trackDiv.style.setProperty("display", "block")

    gameInterval=setInterval(handleGame, 10);
    
    document.addEventListener("keydown", function (event) {
    jump();    
    
});

}

function handleGame(){
    scoreValue=scoreValue+speedScale
    scoreSpan.innerHTML=Math.round(scoreValue)

    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactusChar).getPropertyValue("left"));

    if (cactusLeft > 0 && cactusLeft < 90 && dinoTop === 30) {
        
        for (let i = 0; i < cactusBgDivChildren.length; i++) {
            cactusBgDivChildren[i].style.animationPlayState = "paused";
        }
        ground.style.animationPlayState = "paused";

        dino.style.animationPlayState = "paused";
        cactusChar.style.animationPlayState = "paused";
        clearInterval(gameInterval)
        showModal()
    }

}

function jump() {
    if (dino.classList != "jump") {
        dino.classList.add("jump");
        setTimeout(function () {
            dino.classList.remove("jump");
        }, 300);
    }
}



function showModal(){
    modal.style.setProperty("display", "block")
    if(scoreValue>highestScoreValue)
    {
        headerMessageSpan.innerHTML="Congrats!"
        messageSpan.innerHTML="You beat the highest score 🎉"
    }
    else{
        headerMessageSpan.innerHTML="Boo!"
        messageSpan.innerHTML="You can't beat the highest score 😸"
    }

    yourScoreSpan.innerHTML=Math.round(scoreValue)
}

function playAgain() {
    window.location.reload();
}


