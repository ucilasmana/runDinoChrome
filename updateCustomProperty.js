export function getCustomProperty(element, prop)
{
    return parseFloat(getComputedStyle(element).getPropertyValue(prop)) || 0
}

export function incrementCustomProperty(element, prop, increment)
{
    element.style.setProperty(prop, getCustomProperty(element, prop )+ increment)

}