import React from 'react'
import { Route, Switch } from 'react-router'

import Home from './components/Home'
import Viewer from './containers/Viewer'

const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/:publicationId" component={Viewer} />
  </Switch>
)

export default routes
