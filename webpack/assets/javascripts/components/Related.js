import { Component } from 'react'
import Radium from 'radium'
import HomeLink from './HomeLink'

@Radium
export default class Related extends Component {
  render() {
    return (
      <div style={ styles.container }>
        <h3>Related widgets</h3>
        <p style={ styles.small }>
          Paste links (in multiples of 3) from any Gawker site where it says
          "Paste a link" below. Also, please change the header from the
          boring "Recommended stories" default to something more interesting
          where it says "Default header..."
        </p>
        <iframe src="http://gawker-labs.com/related-widget/"
          style={ styles.iframe }
        />
      </div>
    )
  }
}

const styles = {
  container: {
    maxWidth: 600,
  },
  small: {
    fontSize: 13,
  },
  iframe: {
    width: '100%',
    height: 500,
    outline: 'none',
    border: 'none',
  },
  img: {
    maxWidth: "100%",
    margin: "10px 0",
  },
  link: {
    color: 'red',
  },
}
