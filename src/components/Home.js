import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from './home.css'

class Home extends Component {

  render() {
    return(
      <div>
      This is my Home component -
        <Link to='/example'>
          Go to Viewer
        </Link>
      </div>
    )
  }
}

export default connect()(Home)
