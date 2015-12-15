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

  selectSuggestion(person) {
    let { handleChoice } = this.props
    handleChoice(person)
    this.refs.input.value = person.name
  }

  renderSuggestions() {
    let { suggestions, SuggestionComponent } = this.props
    return suggestions.map( person => {
      return (
        <SuggestionComponent key={ person.id } person={ person }
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
    } = this.props
    return (
      <div style={ styles.container }>
        { this.renderField() }
        <input type="text" placeholder={ placeholder }
          onChange={ this.handleChange.bind(this) }
          name={ name }
          style={ styles.input }
          defaultValue={ initialValue }
          ref="input"
        />
        { suggestions && suggestions.length > 0 &&
          this.renderSuggestions()
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
