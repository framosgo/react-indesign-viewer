import React, { Component } from 'react'

export default class AnimationInjector extends Component {
  componentDidMount() {
    this.componentAnimation = animationCreator(this.component)
  }

  componentWillAppear(appeared) {
    this.componentAnimation(this.props.animation)('appear')(appeared)()
  }

  componentWillEnter(entered) {
    this.componentAnimation(this.props.animation)('enter')(entered)()
  }

  componentWillLeave(left) {
    this.componentAnimation(this.props.animation)('leave')(left)()
  }

  render() {
    return (
      <div ref={component => this.component = component} id="AnimationInjector">
        {this.props.children}
      </div>
    )
  }
}

const animationCreator = animation => state => node => fn => {
  if(animation[state] && animation[state].type){
    node.className =  'animated ' + animation[state].type
    return setTimeout(() => fn, animation[state].duration || 1000)
  } else {
    return fn
  }
}
