import { getCustomProperty, incrementCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 700
const CACTUS_INTERVAL_MAX = 2000
const landElem = document.querySelector("[data-land]")

let cactus_index = 1;

let nextCactusTime

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    if(cactus_index < 3)
    {
        cactus.src = "imgs/char-cactus"+cactus_index+".png"
        if(cactus_index == 2)
        {
            cactus_index=0;
        }
        cactus_index++;
    }
    cactus.classList.add("cactus-char")
    cactus.style.setProperty("--left", 100)
    landElem.append(cactus)
}
function randomNumberBetween(min, max)
{
    min=Math.ceil(min)
    max=Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export function setupCactus()
{
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
    })
}
export function updateCactus(elapsed_time, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", elapsed_time * speedScale * SPEED * -1)
        if (getCustomProperty(cactus, "--left") <= -100)
        {
            cactus.remove()
        }
    })
    if(nextCactusTime <= 0)
    {   
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= elapsed_time

}
export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}
