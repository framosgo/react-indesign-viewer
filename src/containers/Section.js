import React, { Component } from 'react'
import { connect } from 'react-redux'

import Image from '../components/Image'
import Rectangle from '../components/Rectangle'

import Animator from './Animator'

import styles from './section.css'

const ANIMATION_LAYER = {
  delay: 0,
  enter: {
    type: 'fadeIn',
    duration: 500
  },
  leave: {
    type: 'fadeOut',
    duration: 500
  }
}

export default class Section extends Component {
  constructor(props){
    super(props)
    this.createLayers = this.createLayers.bind(this)
  }

  componentWillMount() {
    this.section = this.createLayers()
  }

  createLayers() {
    const layers = this.props.layers
    let layerList = (layers && Array !== layers.constructor) ? [layers] : layers

    return layerList.map( (layer,i) =>
      (<Animator key={i} name={layer.name} bounds={layer.bounds}
                 id={this.props.id} animation={ANIMATION_LAYER}>
          {layer.elements.map((elm,j) => this.createComponent(elm,j))}
        </Animator>)
    )
  }

  createComponent(element,j) {
    let NewComponent
    if( element.format ){
      NewComponent = Image
    } else {
      NewComponent = Rectangle
    }
    const { name, bounds, style, animation, ...res } = element
    const { height, width, ...restStyle} = style
    return (
      <Animator key={j} id={this.props.id} name={name} bounds={bounds} animation={animation}
                style={Object.assign({},style,{position: 'absolute',display:'flex'})}>
        <NewComponent { ...res } style={Object.assign({},restStyle,{flex:1})}/>
      </Animator>
    )
  }

  render() {
    return (
      <div id="Section" style={{height: '100%', width: '100%', position:'relative'}}>
        {this.section}
      </div>
      /*
      <div style={{height:this.props.style.height*this.props.scale,
                  width: this.props.style.width*this.props.scale,
                  position:'relative',
                  transitionDuration: this.props.transitionDuration,
                  transform: `translate3d(0,-${this.props.subSection + this.props.distanceX}px,0)` }}>
        {this.section}
      </div>
      */
    )
  }
}

/*
const mapStateToProps = (state, ownProps) => {
  return {
    scale: state.viewer.scale
    subSection: state.viewer.subSection,
    distanceY: state.viewer.distanceY
  }
}

export default connect(mapStateToProps)(Section)
*/
