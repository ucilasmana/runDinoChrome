import {setupGround, updateGround} from './ground.js'
import { setupWorld} from './world.js'
import {setupDino, updateDino, getDinoRect, setDinoLose} from './dino.js'
import {setupCactus, updateCactus, getCactusRects} from './cactus.js'

/*
const World_Width = 100
const World_Height = 30

const worldElem = document.querySelector("[data-world]")
setPixelToWorldScale()
//when the user resize the browser, the function will be calling 
window.addEventListener("resize", setPixelToWorldScale)
funckhtion setPixelToWorldScale() {
    let worldToPioxelScale
    //If window is wider than the world_with
    if (window.innerWidth / window.innerHeight < World_Width / World_Height) {
        //the pixel scale based on the width
        worldToPixelScale = window.innerWidth / World_Width
    }
    else {
         //the pixel scale based on the height
        worldToPixelScale = window.innerHeight / World_Height
    }
    worldElem.style.width = `${World_Width * worldToPixelScale}px`
    worldElem.style.height = `${World_Height * worldToPixelScale}px`
 }*/

 const startScreenElem = document.querySelector("[data-start-screen]")
 const scoreElem = document.querySelector("[data-score]")
 const SPEED_SCALE_INCREASE = 0.00001

 document.addEventListener("keydown", handleStart, {once:true})

 let speedScale;
 let start;
 let score
 function step(timestamp)
 {
    if (start == undefined)
    {
        start=timestamp;
        window.requestAnimationFrame(step)
    }
    const elapsed_time = timestamp - start;
   
    setupWorld(elapsed_time)
    updateGround(elapsed_time, speedScale)
    updateCactus(elapsed_time, speedScale)
    updateDino(elapsed_time, speedScale)
    if(checkLose()) return handleLose()
    updateScore(elapsed_time)
    updateSpeedScale(elapsed_time)
    
    start=timestamp;
    window.requestAnimationFrame(step)
 }

 function handleStart() { 

    start = undefined
    speedScale = 1
    score = 0

    setupGround()
    setupDino()
    setupCactus()

    startScreenElem.style.setProperty("display", "hidden")
    scoreElem.style.setProperty("display", "block")

    window.requestAnimationFrame(step)

}
function handleLose() {
    setDinoLose()
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, {once:true})
        startScreenElem.classList.remove("hide")
    }, 100)
}
function checkLose() {
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
}
function isCollision(rect1, rect2)
{
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom && 
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function updateScore(elapsed_time)
 {
     //every second we get 10 points
     
     score += elapsed_time * 0.01
     //The floor() function of the math object accepts a floating point number and returns the largest integer less than or equal to the given number
   
     scoreElem.textContent = Math.floor(score)
 }
 
 function updateSpeedScale(elapsed_time)
{ 
    speedScale += elapsed_time * SPEED_SCALE_INCREASE
}



