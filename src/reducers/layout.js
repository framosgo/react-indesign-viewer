import update from 'immutability-helper'

import {
  LOAD_SECTIONS,
  SET_VISIBILITY,
  SET_RENDERABILITY
} from '../actions'

const initialState = {
  sections: [ /*
    {
      visible: {},
      renderable: {}
    } */
  ]
}

export default function layout(state = initialState, action) {
  switch (action.type) {
    case LOAD_SECTIONS:
      console.log("LOAD_SECTIONS called")
      const sections = action.sections.map(section => loadVisiblesRenderables(section.layout.layers))
      return update(state, {
        sections: { $set: sections}
      })

    case SET_VISIBILITY:
      console.log("SET_VISIBILITY called")
      return update(state, {
        sections: {
          [action.section]: {
            visible: {
              [action.name]: { $set: action.isVisible }
            }
          }
        }
      })

    case SET_RENDERABILITY:
      console.log("SET_RENDERABILITY called")
      return update(state, {
        sections: {
          [action.section]: {
            renderable: {
              [action.name]: { $set: action.isRenderable }
            }
          }
        }
      })

    default:
      return state
    }
}

function loadVisiblesRenderables(element, visible = {}, renderable = {}) {
  let elements = (element && element.constructor != Array) ? [element] : element
  for(let [index, elem] of elements.entries()){
    visible[elem.name] = false
    renderable[elem.name] = elem.hidden !== undefined ? !elem.hidden : !index

    if(elem.elements && (elem.elements || elem.elements.length >0)){
      loadVisiblesRenderables(elem.elements, visible, renderable)
    }
  }

  return {visible, renderable}
}
