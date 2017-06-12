import React, {Component} from 'react'

import styles from './tool.css'

export default class Tool extends Component {
  render() {
    return(
      <div className={styles.container} onClick={() => this.props.onClick()}>
        <i className={this.props.className} aria-hidden="true"></i>
      </div>
    )
  }
}
