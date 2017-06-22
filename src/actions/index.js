/*
 *  These are avaliable for all aplications
 */

// Actions types
export const LOAD_SECTIONS = 'LOAD_SECTIONS'

export const SET_VISIBILITY = 'SET_VISIBILITY'

export const SET_RENDERABILITY = 'SET_RENDERABILITY'

export const UPDATE_SCALE = 'UPDATE_SCALE'

export const SHOW_HIDE_THUMBNAIL = 'SHOW_HIDE_THUMBNAIL'

export const GO_TO_SECTION = 'GO_TO_SECTION'

export const MOVE_SECTION = 'MOVE_SECTION'

export const GO_TO_SUB_SECTION = 'GO_TO_SUB_SECTION'

export const MOVE_SUB_SECTION = 'MOVE_SUB_SECTION'

export const SLIDE_ON = 'SLIDE_ON'

export const SLIDE_HORIZONTALLY = 'SLIDE_HORIZONTALLY'

export const SLIDE_VERTICALLY = 'SLIDE_VERTICALLY'

export const SLIDE_OFF = 'SLIDE_OFF'

export const FULL_SCREEN = 'FULL_SCREEN'

export const SHARE = 'SHARE'

export const ABOUT = 'ABOUT'

// Action creator
export function loadSections(sections){
  return { type: LOAD_SECTIONS, sections}
}

export function setVisibility(section, name, isVisible){
  return { type: SET_VISIBILITY, section, name, isVisible}
}

export function setRenderability(section, name, isRenderable){
  return { type: SET_RENDERABILITY, section, name, isRenderable}
}

export function goToPath(path) {
  return { type: GO_TO_PATH, path }
}

export function updateScale(newScale) {
  return { type: UPDATE_SCALE, newScale }
}

export function showHideThumbnail() {
  return { type: SHOW_HIDE_THUMBNAIL }
}

export function goToSection(section) {
  return { type: GO_TO_SECTION, section }
}

export function moveSection(distance,limit) {
  return { type: MOVE_SECTION, distance, limit }
}

export function goToSubSection(subSection){
  return { type: GO_TO_SUB_SECTION, subSection }
}

export function moveSubSection(distance, limit) {
  return { type: MOVE_SUB_SECTION, distance, limit }
}

export function slideON() {
  return { type: SLIDE_ON }
}

export function slideVertically(distance) {
  return { type: SLIDE_VERTICALLY, distance }
}

export function slideHorizontally(distance) {
  return { type: SLIDE_HORIZONTALLY, distance }
}

export function slideOFF(horizontal, vertical) {
  return { type: SLIDE_OFF, horizontal, vertical }
}

export function fullScreen(){
  return { type: FULL_SCREEN }
}

export function share(){
  return { type: SHARE }
}

export function about(){
  return { type: ABOUT }
}
