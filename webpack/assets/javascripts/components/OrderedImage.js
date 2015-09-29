import React from 'react'
import Radium from 'radium'

@Radium
export default class OrderedImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: props.index + 1
    }
  }

  // componentWillUpdate() {
  //   this.setState({
  //     num: this.props.index + 1
  //   })
  // }

  handleChange(e) {
    this.handleBlur(e)
    // let value = parseInt(e.target.value)
    // this.setState({ num: parseInt(e.target.value) })
  }

  handleBlur(e) {
    let { index, max } = this.props
    let num = parseInt(e.target.value)
    // let { num } = this.state
    if (index === num - 1 || index < 0 || index > max) return
    this.props.reorderImages(index, num - 1)
  }

  handleFocus(e) {
    e.target.select()
  }

  render() {
    let { file, index } = this.props
    let { num } = this.state
    let img_container_style = styles.img_container
    if (file.preview) {
      img_container_style = { ...img_container_style, ...styles.preview }
    }
    return (
      <div style={ img_container_style }>
        <div style={ styles.number }>
          <input
            type="text"
            value={ index + 1 }
            style={ styles.input }
            onBlur={ this.handleBlur.bind(this) }
            onChange={ this.handleChange.bind(this) }
            onFocus={ this.handleFocus.bind(this) }
          />
        </div>
        <img src={ file.url || file.preview } style={ styles.thumb } />
      </div>
    )
  }

}

const styles = {
  img_container: {
    position: 'relative',
    transition: 'opacity .5s ease-in-out',
  },
  input: {
    width: 10,
    outline: 'none',
    border: 'none',
    color: 'white',
    background: 'black',
    textAlign: 'center',
  },
  number: {
    position: 'absolute',
    top: 20,
    right: 20,
    background: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    width: 30,
    height: 30,
    borderRadius: '50%',
  },
  thumb: {
    maxWidth: 150,
    margin: 10,
  },
  preview: {
    opacity: 0.3,
  }
}
