import React from 'react'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'

@Radium
export default class Style extends React.Component {
  render() {
    let { index } = this.state
    let { description } = this.props.style
    return (
      <div>HELLO STYLE</div>
    )
  }
}

const styles = {
  global: {
    fontFamily: 'ElizabethSerif',
    backgroundColor: 'white',
    width: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
  },
}

