import React, { Component } from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { connect } from 'react-redux'

import AnimationInjector from '../components/AnimationInjector'
import Scalator from './Scalator'

const Animator = (props) => {
  const isLayer = props.bounds ? false : true
  return (
    <TransitionGroup component={'div'} id="TransitionGroup">
      {props.renderable && (
        <AnimationInjector animation={props.animation}>
          {isLayer ?
            <div id="No-Scalator">
              {props.children}
            </div>
            :
            <Scalator bounds={props.bounds} style={props.style}>
              {props.children}
            </Scalator>
          }
        </AnimationInjector>
      )}
    </TransitionGroup>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    renderable: state.layout.sections[ownProps.id].renderable[ownProps.name]
  }
}

export default connect(mapStateToProps)(Animator)
