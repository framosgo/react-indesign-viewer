import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import layout from './layout'

const reducers = combineReducers({
    layout,
    router: routerReducer

})
export default reducers
