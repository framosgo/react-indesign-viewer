import React, {Component} from 'react'
import { connect } from 'react-redux'

import styles from './section.css'

class Section extends Component {
  render() {
    return(
      <div className={styles.container} style={{height:this.props.style.height*this.props.scale, width: this.props.style.width*this.props.scale, backgroundColor: this.props.id%2 ? 'lightblue': 'snow'}}>
        Section {this.props.id}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    scale: state.viewer.scale,
    isCurrent: state.viewer.section === ownProps.id,
    visible: state.layout.sections[ownProps.id].visible,
    renderable: state.layout.sections[ownProps.id].renderable
  }
}

export default connect(mapStateToProps)(Section)
