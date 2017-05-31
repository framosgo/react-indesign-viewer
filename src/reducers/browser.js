import {
  BROWSER_RESIZE
} from '../actions'

const initialState = {
  size: null
}

export default function browser(state = initialState, action) {
  switch (action.type) {
    case BROWSER_RESIZE:
      console.log("BROWSER_RESIZE called")
      return state

    default:
      state
  }
  return state;
}
