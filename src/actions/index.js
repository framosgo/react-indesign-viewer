/*
 *  These are avaliable for all aplications
 */

// Actions types
export const LOAD_LAYOUT = 'LOAD_LAYOUT'

export const SET_VISIBILITY = 'SET_VISIBILITY'
export const SET_RENDERABILITY = 'SET_RENDERABILITY'

export const GO_TO_PATH = 'GO_TO_PATH'

export const BROWSER_RESIZE = 'BROWSER_RESIZE'


// Action creator
export function loadLayout(elements, size){
  return { type: LOAD_LAYOUT, elements, size}
}

export function setVisibility(name, isVisible){
  return { type: SET_VISIBILITY, name, isVisible}
}

export function setRenderability(name, isRenderable){
  return { type: SET_RENDERABILITY, name, isRenderable}
}

export function goToPath(path) {
  return { type: GO_TO_PATH, path }
}

export function browserResize(id, name) {
  return { type: BROWSER_RESIZE, id, name}
}
