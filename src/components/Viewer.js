import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from './viewer.css'

class Viewer extends Component {

  render() {
    return(
      <div>
        This is my Viewer component -
        <Link to='/'>
          Go to Home
        </Link>
      </div>
    )
  }
}


export default connect()(Viewer)
