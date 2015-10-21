import { Component } from 'react'
import Radium from 'radium'

@Radium
export default class FieldAndInput extends Component {
  renderField() {
    let { title } = this.props
    return (
      <label>{ title }</label>
    )
  }

  renderInput() {
    let {
      handleNameChange,
      placeholder,
      name,
      initialValue,
    } = this.props
    return (
      <div style={ styles.container }>
        { this.renderField() }
        <input type="text" placeholder={ placeholder }
          onChange={ (e) => handleNameChange(e) }
          name={ name }
          style={ styles.input }
          defaultValue={ initialValue }
        />
      </div>
    )
  }

  renderTextarea() {
    let {
      handleNameChange,
      placeholder,
      name,
      initialValue,
    } = this.props
    return (
      <div style={ styles.container }>
        { this.renderField() }
        <textarea placeholder={ placeholder }
          onChange={ (e) => handleNameChange(e) }
          name={ name }
          style={ styles.textarea }
          defaultValue={ initialValue }
        />
      </div>
    )
  }

  render() {
    let { type='input' } = this.props
    if (type === 'input') {
      return this.renderInput()
    } else {
      return this.renderTextarea()
    }
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    fontSize: 16,
    padding: '5px 10px',
    marginBottom: 20,
    outline: 'none'
  },
  textarea: {
    fontSize: 13,
    // padding: '10px 5px',
    padding: 10,
    marginBottom: 20,
    outline: 'none',
    // fontFamily: 'ElizabethSerif'
  },
}
