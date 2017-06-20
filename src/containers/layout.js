import React, {Component} from 'react'
import { connect } from 'react-redux'

import {
  moveSection,
  updateScale,
  loadSections
} from '../actions'

import Section from './Section'
import Loader from '../components/Loader'

import styles from './layout.css'

class Layout extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      sliding: false,
      distanceX: 0,
      distanceY: 0
    }
    this.sections
    this.checkScale = this.checkScale.bind(this)
    this._onMouseUp = this._onMouseUp.bind(this)
    this._onMouseMove = this._onMouseMove.bind(this)
    this._onMouseDown = this._onMouseDown.bind(this)
  }

  componentWillMount() {
    if(!this.props.scale) window.addEventListener('resize',  this.checkScale )
  }

  componentWillUnmount() {
    if(this.props.scale) window.removeEventListener('resize', this.checkScale)
  }

  checkScale() {
    const newScale = scalate(this.props.width, this.props.height)(this.layout.clientWidth,this.layout.clientHeight)
    this.props.updateScale(newScale)
  }

  componentDidMount() {
    this.checkScale()
    const sectionURL = add(this.props.source.slice(0,-11))
    const promises = this.props.sections.map(section => fetch(sectionURL(section + '/layout.json')).then(res => res.json()))
    Promise.all(promises)
    .then(results => {
      this.props.loadSections(results)
      this.sections = results

      this.setState({
        loaded: true
      })
    })
  }

  _onMouseDown(e) {
    this.mousePositionX = e.clientX
    this.mousePositionY = e.clientY
    this.maxDistanceX = this.scaledWidth*0.25
    this.maxDistanceY = this.scaledHeight*0.20
    this.setState({
      sliding: true,
      distanceX: 0,
      distanceY: 0
    })
  }

  _onMouseMove(e) {
    if(this.state.sliding){
      const distanceX = this.mousePositionX - e.clientX
      const distanceY = this.mousePositionY - e.clientY
      if((distanceX >= -this.maxDistanceX && distanceX <= this.maxDistanceX) &&
        (distanceY >= -this.maxDistanceY && distanceY <= this.maxDistanceY)) {

        if(this.state.distanceX == 0 && this.state.distanceY == 0){
          if(Math.abs(distanceX) > Math.abs(distanceY)) {
            this.setState({
              distanceX: distanceX,
              distanceY: 0
            })
          } else if(Math.abs(distanceX) < Math.abs(distanceY)) {
            this.setState({
              distanceX: 0,
              distanceY: distanceY
            })
          }

        } else if(Math.abs(this.state.distanceX) > Math.abs(this.state.distanceY)) {
          this.setState({
            distanceX: distanceX,
            distanceY: 0
          })

        } else if(Math.abs(this.state.distanceX) < Math.abs(this.state.distanceY)) {
          this.setState({
            distanceX: 0,
            distanceY: distanceY
          })
        }
      }
    }
  }

  _onMouseUp(e) {
    const distanceX = this.mousePositionX - e.clientX
    const distanceY = this.mousePositionY - e.clientY
    if(this.state.distanceX != 0 && this.state.distanceY == 0){
      if(distanceX >= this.maxDistanceX){
        this.props.moveSection(1,this.props.sections.length-1)
      } else if(distanceX <= -this.maxDistanceX){
        this.props.moveSection(-1,this.props.sections.length-1)
      }
    } else if(this.state.distanceY != 0 && this.state.distanceX == 0){
      // if(distanceY >= this.maxDistanceY){
      //   this.onArrowDown()
      // } else if(distanceY <= -this.maxDistanceY){
      //   this.onArrowUp()
      // }
    }
    this.setState({
      sliding: false,
      distanceX: 0,
      distanceY: 0
    })
  }

  render() {
    this.scaledHeight = this.props.height*this.props.scale
    this.scaledWidth = this.props.width*this.props.scale
    return (
      <div className={styles.container} ref={(layout)=> {this.layout = layout}}
            onMouseUp={(e)=>{this._onMouseUp(e)}}
            onMouseLeave={(e)=>{this._onMouseUp(e)}}>
        {!this.state.loaded ? <Loader /> :
          <div style={{height: this.scaledHeight, width: this.scaledWidth}}
                onMouseDown={(e)=> this._onMouseDown(e)}
                onMouseMove={(e)=> this._onMouseMove(e)}>
            <div className={styles.content}
                style={{width: this.scaledWidth*this.sections.length,
                        transitionDuration: this.props.allowTransition ? '1s' : '0s',
                        transform: `translate3d(-${this.props.section*this.scaledWidth + this.state.distanceX}px, 0,0)`}}>
              {this.sections.map((section,i) =>  {
                return (
                  <div key={section.layout.name + i}
                      style={{height:section.layout.style.height*this.props.scale, width: section.layout.style.width*this.props.scale, backgroundColor: i%2 ? 'lightblue': 'snow'}}>
                    <Section key={section.layout.name + i} id={i} {...section.layout} />
                  </div>
                )
              })}
            </div>
          </div>
        }
      </div>
    )
  }
}

const scalate = (width, height) => (newWidth, newHeight) => {
  return Math.round(Math.min(newWidth/width, newHeight/height) * 1000)/1000
}

const add = (a) => (b) =>  a + b

const mapStateToProps = (state, ownProps) => {
  return {
    scale: state.viewer.scale,
    section: state.viewer.section,
    allowTransition: state.viewer.allowTransition
  }
}

const mapDispatchtoProps = (dispatch, ownProps) => {
  return {
    moveSection: (section,limit) => dispatch(moveSection(section,limit)),
    updateScale: (newScale) => dispatch(updateScale(newScale)),
    loadSections: (sections) => dispatch(loadSections(sections))
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Layout)
