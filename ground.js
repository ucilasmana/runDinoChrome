import { getCustomProperty, incrementCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05

const groundElems = document.querySelectorAll("[data-ground]")


export function setupGround()
{
    groundElems[0].style.setProperty("--left", 0)
    groundElems[1].style.setProperty("--left", 100)
 
}
export function updateGround(elapsed_time, speedScale)
{
       groundElems.forEach(ground => {
       
        incrementCustomProperty(ground, "--left", elapsed_time * speedScale * SPEED * -1)

         //we want to make a never-ending ground
        if(getCustomProperty(ground, "--left") <= -100)
        {
        //600 is the right width to create looping for the grounds without overlapping each other (they just meet each other)
        incrementCustomProperty(ground, "--left", 200)
        //if you check the value of property --left in Devtools browser, you can see when the first ground value decrease until it become negative (-) it means the ground is going to the left 
        //and when this happen you can see th second ground become positive (+) until 300 and then it will decrease like the first ground because its moves to the left and then the first ground become positive. This happens over and over.
        }
        })
}