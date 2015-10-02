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

  handleChange(e) {
    this.handleBlur(e)
  }

  handleBlur(e) {
    let { index, max } = this.props
    let num = parseInt(e.target.value)
    if (index === num - 1 || index < 0 || index > max) return
    this.props.reorderImages(index, num - 1)
  }

  handleFocus(e) {
    e.target.select()
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('okay')
  }

  render() {
    let { file, index } = this.props
    let { num } = this.state
    let container = styles.container
    if (file.preview) {
      container = { ...container, ...styles.preview }
    }
    return (
      <div style={ container }>
        <img src={ file.url || file.preview } style={ styles.thumb } />
        <form onSubmit={ this.handleSubmit.bind(this) }
          style={ styles.form }
        >
          <div style={ styles.inputContainer }>
            <textarea style={ styles.input }placeholder="Caption (optional)"/>
            <input style={ styles.input } type="text" placeholder="Photo credit (optional)"/>
          </div>
        </form>
      </div>
    )
        // <div style={ styles.number }>
        //   <input
        //     type="text"
        //     value={ index + 1 }
        //     style={ styles.input }
        //     onBlur={ this.handleBlur.bind(this) }
        //     onChange={ this.handleChange.bind(this) }
        //     onFocus={ this.handleFocus.bind(this) }
        //   />
        // </div>
  }

}

const styles = {
  container: {
    transition: 'opacity .5s ease-in-out',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumb: {
    maxWidth: 150,
    margin: 10,
    flex: '1 0 150'
  },
  form: {
    flex: '1 0'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    outline: 'none',
    border: '1px solid #ddd',
    padding: 5,
    marginBottom: 10,
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
  preview: {
    opacity: 0.3,
  }
}
