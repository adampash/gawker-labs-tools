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

  handleChange(e) {
    let {
      handleNameChange,
      autocomplete
    } = this.props
    autocomplete(e.target.value)
    handleNameChange(e)
  }

  selectSuggestion(suggestion) {
    let { handleChoice } = this.props
    handleChoice(suggestion)
    this.refs.input.value = suggestion.name
  }

  renderSuggestions() {
    let { suggestions, SuggestionComponent } = this.props
    return suggestions.map( (suggestion, index) => {
      return (
        <SuggestionComponent key={ index } suggestion={ suggestion }
          select={ this.selectSuggestion.bind(this) }
        />
      )
    })
  }

  renderInput() {
    let {
      placeholder,
      name,
      initialValue,
      suggestions,
      disabled,
    } = this.props
    return (
      <div style={ styles.container }>
        { this.renderField() }
        <input type="text" placeholder={ placeholder }
          onChange={ this.handleChange.bind(this) }
          name={ name }
          style={{ ...styles.input, ...(disabled ? styles.disabled : {}) }}
          defaultValue={ initialValue }
          ref="input"
          disabled={ disabled }
        />
        { suggestions && suggestions.length > 0 &&
          <div style={ styles.autocomplete }>
            { this.renderSuggestions() }
          </div>
        }
      </div>
    )
  }

  renderTextarea() {
    let {
      handleNameChange,
      placeholder,
      name,
      initialValue,
      disabled,
    } = this.props
    return (
      <div style={ styles.container }>
        { this.renderField() }
        <textarea placeholder={ placeholder }
          onChange={ (e) => handleNameChange(e) }
          name={ name }
          style={ styles.textarea }
          defaultValue={ initialValue }
          disabled={ disabled }
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
    outline: 'none',
  },
  textarea: {
    fontSize: 13,
    padding: 10,
    marginBottom: 20,
    outline: 'none',
  },
  disabled: {
    color: 'black',
    outline: 'none',
    border: 'none',
    background: 'none',
  },
  autocomplete: {
    position: 'absolute',
    background: 'white',
    maxWidth: 540,
    width: '100%',
    marginTop: -21,
    border: '1px solid black',
    zIndex: 100,
  },
}
