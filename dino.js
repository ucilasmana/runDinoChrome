import { getCustomProperty, incrementCustomProperty } from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.002
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
export function setupDino()
{
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    dinoElem.style.setProperty("--bottom", 9)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}
function onJump(e) {
    //If the e.code is not Space or ArrowUp then nothing will happen
    //But when it's true, it will check if the dino is jumping or not
    //When it's not, it will executed the next lines
    switch(e.code)
    {
        case "Space":
        case "ArrowUp":
        break;
        default:
            return //Do Nothing
    }
    if(isJumping) return //Do Nothing
    
    yVelocity = JUMP_SPEED
    isJumping = true

    
}
export function updateDino(elapsed_time, speedScale)
{
    handleRun(elapsed_time, speedScale)
    handleJump(elapsed_time)
}

function handleRun(elapsed_time, speedScale)
{
    if(isJumping)
    {
        dinoElem.src = `imgs/dino-stationary.png`
        return
    }
    //it become faster as time goes by
    if (currentFrameTime >= FRAME_TIME) 
    {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += elapsed_time * speedScale
}

function handleJump(elapsed_time)
{
 
    if(!isJumping) return 
  
    incrementCustomProperty(dinoElem, "--bottom", yVelocity * elapsed_time)

    if(getCustomProperty(dinoElem, "--bottom") <= 10)
    {
        dinoElem.style.setProperty("--bottom", 10)
        isJumping = false
    }

    yVelocity -= GRAVITY * elapsed_time
    
    
}

export function getDinoRect()
{
    return dinoElem.getBoundingClientRect()
}

export function setDinoLose(){
    dinoElem.src = "imgs/dino-lose.png"
}