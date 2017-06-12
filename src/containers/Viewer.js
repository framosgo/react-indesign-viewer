import React, {Component} from 'react'
import { connect } from 'react-redux'

import Thumbnail from '../components/Thumbnail'
import Loader from '../components/Loader'

import Tools from './Tools'
import Layout from './Layout'

import styles from './viewer.css'

class Viewer extends Component {
  constructor(props) {
    super(props)
    this.config
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    fetch('https://s3-eu-west-1.amazonaws.com/dssnetwork/ByCube/demo/web/config.json')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // real data
      // this.config = data

      // mockdata
      this.config = {
        backgroundColor: "#333333",
        tools: true,
        thumbnail: true,
        width: 1024,
        height: 768,
        sections: [
          'magmaview',
          'magmaview',
          'magmaview',
          'magmaview',
          'magmaview',
          'magmaview',
          'magmaview',
          'magmaview'
        ]
      }
      this.setState({
        loaded: true
      })
    })
  }

  render() {
    return !this.state.loaded ? <Loader /> :
      <div className={styles.container} style={{backgroundColor: this.config.backgroundColor}}>
        <div className={styles.content}>
          <Layout {...this.config}/>
          {this.config.thumbnail && this.props.isThumbnail && <Thumbnail />}
        </div>
        {this.config.tools && <Tools numSections={this.config.sections.length}/>}
      </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isThumbnail: state.viewer.isThumbnail
  }
}

export default connect(mapStateToProps)(Viewer)
