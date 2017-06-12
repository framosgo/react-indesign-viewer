import {
  UPDATE_SCALE,
  SHOW_HIDE_THUMBNAIL,
  GO_TO_SECTION,
  MOVE_SECTION,
  GO_TO_SUB_SECTION,
  MOVE_SUB_SECTION,
  FULL_SCREEN,
  SHARE,
  ABOUT
} from '../actions'

const initialState = {
  scale: null,
  section: 0,
  subSection: 0,
  isThumbnail: false,
  isFullScreen: false,
  sharing: false,
  about: false
}

export default function viewer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SCALE:
      console.log("UPDATE_SCALE called")
      return Object.assign({}, state, {
        scale: action.newScale
      })

    case SHOW_HIDE_THUMBNAIL:
      return Object.assign({}, state, {
        isThumbnail: !state.isThumbnail
      })

    case GO_TO_SECTION:
      return Object.assign({}, state, {
        section: action.section
      })

    case MOVE_SECTION:
      const newSection = state.section + action.distance
      return Object.assign({}, state, {
        section: newSection < 0 ? 0 : ((newSection > action.limit) ? action.limit : newSection)
      })

    case GO_TO_SUB_SECTION:
      return Object.assign({}, state, {
        subSection: action.subSection
      })

    case MOVE_SUB_SECTION:
      return Object.assign({}, state, {
        subSection: state.subSection + action.distance
      })

    case FULL_SCREEN:
      return Object.assign({}, state, {
        isFullScreen: !state.isFullScreen
      })

    case SHARE:
      return Object.assign({}, state, {
        sharing: !state.sharing
      })

    case ABOUT:
      return Object.assign({}, state, {
        about: !state.about
      })

    default:
      state
  }
  return state;
}
