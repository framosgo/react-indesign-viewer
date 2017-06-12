import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import layout from './layout'
import viewer from './viewer'

const reducers = combineReducers({
    layout,
    viewer,
    router: routerReducer
})
export default reducers
