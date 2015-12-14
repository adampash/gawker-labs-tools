import { Component } from 'react'
import Radium from 'radium'
import FieldAndInput from './FieldAndInput'

@Radium
export default class GoalForm extends Component {
  render() {
    let {
      handleChange,
      goal={},
    } = this.props
    let {
      name,
      title,
      goals,
      otherGoals,
      person = {},
      siteId,
      quarterId,
      jobTitleId
    } = goal
    console.log(person.name)
    return (
      <div>
        <FieldAndInput
          handleNameChange={ handleChange }
          name="name"
          title="Writer's name"
          initialValue={ person.name }
        />
        <FieldAndInput
          handleNameChange={ handleChange }
          name="title"
          title="Title"
          placeholder="Is this a writer, senior writer, editor, etc."
          initialValue={ title }
        />
        <FieldAndInput
          handleNameChange={ handleChange }
          name="goals"
          title="Goal(s)"
          placeholder="Traffic goals, post count goals, feature goals, etc."
          type="textarea"
          initialValue={ goals }
        />
        <FieldAndInput
          handleNameChange={ handleChange }
          name="otherGoals"
          title="Other goals"
          placeholder="Anything else you'd like to see from this person?"
          type="textarea"
          initialValue={ otherGoals }
        />
      </div>
    )
  }
}

