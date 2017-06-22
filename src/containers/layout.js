import React, {Component} from 'react'
import { connect } from 'react-redux'

import {
  moveSection,
  updateScale,
  loadSections,
  slideON,
  slideOFF,
  slideVertically,
  slideHorizontally
} from '../actions'

import Section from './Section'
import Loader from '../components/Loader'

import styles from './layout.css'

class Layout extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
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
    this.maxDistanceX = this.scaledWidth*0.20
    this.maxDistanceY = this.scaledHeight*0.15
    this.limitX = this.props.sections.length -1
    this.limitY = Math.round(this.props.scale*this.sections[this.props.section].layout.style.height/this.props.height)
    this.props.slideON()
  }


  _onMouseMove(e) {
    if(this.props.isSliding){
      const distanceX = e.clientX - this.mousePositionX
      const distanceY = e.clientY - this.mousePositionY
      if( (Math.abs(distanceX) > Math.abs(distanceY)) && (Math.abs(distanceX) <= this.maxDistanceX) ){
        this.props.slideHorizontally(-distanceX)
      } else if( (Math.abs(distanceX) < Math.abs(distanceY)) && (Math.abs(distanceY) <= this.maxDistanceY) ){
        this.props.slideVertically(-distanceY)
      }
    }
  }

  _onMouseUp(e) {
    if(this.props.isSliding){
      const distanceX = e.clientX - this.mousePositionX
      const distanceY = e.clientY - this.mousePositionY

      if(Math.abs(distanceX) >= this.maxDistanceX){
        this.props.slideOFF({move: distanceX > 0 ? 1 : -1, limit: this.limitX})
      } else if(Math.abs(distanceY) >= this.maxDistanceY){
        this.props.slideOFF(null,{move: distanceY > 0 ? 1 : -1, limit: this.limitY})
      } else {
        this.props.slideOFF()
      }
    }
  }

  render() {

    this.scaledHeight = this.props.height*this.props.scale
    this.scaledWidth = this.props.width*this.props.scale

    return (
      <div className={styles.container} ref={ layout => {this.layout = layout} }
            onMouseUp={this._onMouseUp}
            onMouseLeave={this._onMouseUp}>
        {!this.state.loaded ? <Loader /> :
          <div style={{height: this.scaledHeight, width: this.scaledWidth}}
                onMouseDown={this._onMouseDown}
                onMouseMove={this._onMouseMove}>
            <div className={styles.content}
                style={{width: this.scaledWidth*this.sections.length,
                        cursor: this.props.isSliding ? '-webkit-grabbing' : 'auto',
                        transitionDuration: this.props.transitionDuration,
                        transform: `translate3d(-${this.props.section*this.scaledWidth + this.props.distanceX}px, 0,0)`}}>
              {this.sections.map((section,i) =>  {
                const scaledSectionHeight = section.layout.style.height*this.props.scale
                const scaledSectionWidth = section.layout.style.width*this.props.scale
                return (
                  <div key={section.layout.name + i}
                      style={{height: scaledSectionHeight,
                              width: scaledSectionWidth,
                              transitionDuration: this.props.transitionDuration,
                              transform: `translate3d(0,-${this.props.subSection*this.props.height*this.props.scale + this.props.distanceY}px,0)`}}>
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
    subSection: state.viewer.subSection,
    isSliding: state.viewer.isSliding,
    distanceX: state.viewer.distanceX,
    distanceY: state.viewer.distanceY,
    transitionDuration: state.viewer.transitionDuration
  }
}

const mapDispatchtoProps = (dispatch, ownProps) => {
  return {
    slideON: () => dispatch(slideON()),
    slideHorizontally: distance => dispatch(slideHorizontally(distance)),
    slideVertically: distance => dispatch(slideVertically(distance)),
    slideOFF: (horizontal,vertical) => dispatch(slideOFF(horizontal,vertical)),
    moveSection: (section,limit) => dispatch(moveSection(section,limit)),
    updateScale: newScale => dispatch(updateScale(newScale)),
    loadSections: sections => dispatch(loadSections(sections))
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Layout)
