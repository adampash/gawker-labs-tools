import { Component } from 'react'

export default class KinjaResizer extends Component {
  renderChildren() {
    let resize = this.resize.bind(this)
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { resize })
    })
  }

  componentDidMount() {
    let { listen } = this.props
    this.resize()
    if (listen)
      window.addEventListener('resize', this.resize.bind(this))
  }

  componentWillUnmount() {
    let { listen } = this.props
    if (listen)
      window.removeEventListener('resize', this.resize.bind(this))
  }

  resize() {
    let height = this.getHeight() + 10
    // console.log(height)
    window.top.postMessage(
      JSON.stringify({
        kinja: {
          sourceUrl: window.location.href,
          resizeFrame: {
            height
          }
        }
      }), '*'
    )
  }

  getHeight() {
    let minHeight = 100
    let body = document.body
    let html = document.documentElement

    return Math.max(html.scrollHeight, html.offsetHeight, minHeight)
  }

  render() {
    let { style } = this.props
    return (
      <div style={ style }>
        { this.renderChildren() }
      </div>
    )
  }
}

KinjaResizer.defaultProps = {
  listen: true
}
