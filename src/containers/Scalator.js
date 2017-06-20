import React, { Component } from 'react'
import { connect } from 'react-redux'

class Scalator extends Component {
  componentWillMount() {
    const defaultCondition = binaryCondition('auto')
    this.hasStyle = defaultCondition(this.props.style)
    this.hasBounds = defaultCondition(this.props.bounds)
  }

  render() {
    const scalate = multiply(this.props.scale)
    const top = this.hasBounds(scalate(this.props.bounds.top)) + 'px'
    const left = this.hasBounds(scalate(this.props.bounds.left)) + 'px'
    const width = this.hasBounds(scalate(this.props.style.width)) + 'px'
    const height = this.hasBounds(scalate(this.props.style.height)) + 'px'

    const newStyle = Object.assign({},this.props.style,{top,left,width,height})
    return (
      <div style={newStyle} id="Scalator">
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    scale: state.viewer.scale
  }
}

const binaryCondition = cero => condition => one => condition ? one : zero

const multiply = x => y => x * y

export default connect(mapStateToProps)(Scalator)
