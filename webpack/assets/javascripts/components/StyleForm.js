import { Component } from 'react'
import Radium from 'radium'
import FieldAndInput from './FieldAndInput'

@Radium
export default class StyleForm extends Component {
  render() {
    let {
      handleChange,
      styleRule={},
    } = this.props
    let {
      rule,
      details,
      keywords,
    } = styleRule
    return (
      <div>
        <FieldAndInput
          handleNameChange={ handleChange }
          name="rule"
          title="Rule"
          placeholder="E.g., No spaces around an em dash"
          initialValue={ rule }
        />
        <FieldAndInput
          handleNameChange={ handleChange }
          name="details"
          title="Details"
          placeholder="A description or illustration of the rule. E.g., We do not use spaces—none whatsoever—around the em dash."
          type="textarea"
          initialValue={ details }
        />
        <FieldAndInput
          handleNameChange={ handleChange }
          name="keywords"
          title="Keywords"
          placeholder="Include keywords that will help in searching for this style rule; misspellings or likely search phrases are a good start."
          type="textarea"
          initialValue={ keywords }
        />
      </div>
    )
  }
}
