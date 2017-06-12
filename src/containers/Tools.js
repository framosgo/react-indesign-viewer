import React, {Component} from 'react'
import { connect } from 'react-redux'

import {
  goToSection,
  goToSubSection,
  showHideThumbnail,
  moveSubSection,
  moveSection,
  fullScreen,
  share,
  about
} from '../actions'

import Tool from '../components/Tool'
import styles from './tools.css'

const Tools = (props) => {
  const tools = [
    {
      key: 'home',
      className: 'fa fa-home fa-lg',
      onClick: () => {props.goToSection(0); props.goToSubSection(0)}
    },
    {
      key: 'thumbnail',
      className: 'fa fa-th-large fa-lg',
      onClick: () => props.showHideThumbnail()
    },
    {
      key: 'up',
      className: 'fa fa-angle-up fa-lg',
      onClick: ()=> props.moveSubSection(-1)
    },
    {
      key: 'left',
      className: 'fa fa-angle-left fa-lg',
      onClick: () => props.moveSection(-1,props.numSections-1)
    },
    {
      key: 'right',
      className: 'fa fa-angle-right fa-lg',
      onClick: () => props.moveSection(1,props.numSections-1)
    },
    {
      key: 'down',
      className: 'fa fa-angle-down fa-lg',
      onClick: () => props.moveSubSection(1)
    },
    {
      key: 'share',
      className: 'fa fa-share-alt fa-lg',
      onClick: () => props.share()
    },
    {
      key: 'expand',
      className: props.isFullScreen ? 'fa fa-compress fa-lg' : 'fa fa-expand fa-lg',
      onClick: () => props.fullScreen()
    },
    {
      key: 'info',
      className: 'fa fa-info-circle fa-lg',
      onClick: () => props.about()
    }
  ]
  console.log('render Tools');
  return(
    <div className={styles.container}>
      {tools.map((tool) => (<Tool {...tool}/>))}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFullScreen: state.viewer.isFullScreen
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    goToSubSection: (newSubSection) => dispatch(goToSubSection(newSubSection)),
    goToSection: (newSection) => dispatch(goToSection(newSection)),
    moveSubSection: (distance, limit) => dispatch(moveSubSection(distance, limit)),
    moveSection: (distance, limit) => dispatch(moveSection(distance, limit)),
    showHideThumbnail: () => dispatch(showHideThumbnail()),
    fullScreen: () => dispatch(fullScreen()),
    share: () => dispatch(share()),
    about: () => dispatch(about())
  }
}

export default connect(mapStateToProps,mapDispatchtoProps)(Tools)
