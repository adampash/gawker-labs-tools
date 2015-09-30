import { Component } from 'react'

export default class Spiframe extends Component {
  componentDidMount() {
    this.refs.iframe.addEventListener('load', this.props.onLoad)
  }

  handleLoad() {
    this.props.resize()
  }

  render() {
    let { link } = this.props
    return (
      <iframe
        ref="iframe"
        style={ styles.iframe }
        src={ link }
        width="636"
        height="400"
        onLoad={ this.handleLoad.bind(this) }
      />
    )
  }
}

const styles = {
  iframe: {
    outline: 'none',
    border: 'none',
  }
}

