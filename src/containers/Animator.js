import React, { Component } from 'react'
import { connect } from 'react-redux'

import TransitionGroup from 'react-transition-group/TransitionGroup'

const Animator = (props) => {
  return (
    <TransitionGroup component={'div'} id={"animator"} style={props.style}>
      {props.renderable && props.children}
    </TransitionGroup>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    renderable: state.layout.renderable[ownProps.name]
  }
}

export default connect(mapStateToProps)(Animator)
