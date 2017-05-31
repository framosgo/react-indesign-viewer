import update from 'immutability-helper'

import {
  LOAD_LAYOUT,
  SET_VISIBILITY,
  SET_RENDERABILITY
} from '../actions'

const initialState = {
  visible: {},
  renderable: {}
}

export default function layout(state = initialState, action) {
  switch (action.type) {
    case LOAD_LAYOUT:
      console.log("LOAD_LAYOUT called")
      return state

    case SET_VISIBILITY:
      console.log("SET_VISIBILITY called")
      return state

    case SET_RENDERABILITY:
      console.log("SET_RENDERABILITY called")
      return state

    default:
      return state
    }
}
