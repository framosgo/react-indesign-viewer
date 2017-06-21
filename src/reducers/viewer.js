import {
  UPDATE_SCALE,
  SHOW_HIDE_THUMBNAIL,
  GO_TO_SECTION,
  MOVE_SECTION,
  GO_TO_SUB_SECTION,
  MOVE_SUB_SECTION,
  SLIDE_ON,
  SLIDE_HORIZONTALLY,
  SLIDE_VERTICALLY,
  SLIDE_OFF,
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
  about: false,
  isSliding: false,
  transitionDuration: '0s'
}

export default function viewer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SCALE:
      console.log("UPDATE_SCALE called")
      return Object.assign({}, state, {
        transitionDuration: '0s',
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
        transitionDuration: '1s',
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

    case SLIDE_ON:
      return Object.assign({}, state, {
        isSliding: true,
        transitionDuration: '0s',
        distanceX: 0,
        distanceY: 0
      })

    case SLIDE_HORIZONTALLY:
      return Object.assign({}, state, {
        distanceX: action.distance
      })

    case SLIDE_VERTICALLY:
      return Object.assign({}, state, {
        distanceY: action.distance
      })

    case SLIDE_OFF:
      return Object.assign({}, state, {
        isSliding: false,
        transitionDuration: '1s',
        distanceX: 0,
        distanceY: 0
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
