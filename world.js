import { getCustomProperty, incrementCustomProperty } from "./updateCustomProperty.js"

const back_speed = 0.00015
const grassElems = document.querySelectorAll("[data-grass]")
grassElems[0].style.setProperty("--left", 7)
grassElems[1].style.setProperty("--left", 80)

export function setupWorld(elapsed_time)
{
   
    grassElems.forEach(grass => {
        incrementCustomProperty(grass, "--left", elapsed_time * back_speed * -10)
        if(getCustomProperty(grass, "--left") <= -21)
        { 
            grass.style.setProperty("--left", 100)
        }
    })   
   
}

