import React from 'react'
import { Route, Switch } from 'react-router'

import Home from './components/Home'
import Viewer from './components/Viewer'

const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/:publicationId" component={Viewer} />
  </Switch>
)

export default routes
