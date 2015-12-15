import Network from '../Network'
import { Component } from 'react'
import Radium from 'radium'
import FieldAndInput from './FieldAndInput'
import PersonRow from './PersonRow'

@Radium
export default class GoalForm extends Component {
  user_autocomplete(query) {
    let { siteName, quarter } = this.props.params
    let data = {
      query,
      siteName,
      quarter,
    }
    Network.post("users/autocomplete", data)
      .then(data => {
        return data.json()
      })
      .then(user_suggestions => {
        this.setState({
          user_suggestions
        })
      })
  }

  chooseUser(person) {
    this.setState({
      user_suggestions: []
    })
    this.props.handleChange({
      target: { name: 'name', value: person.name },
      person
    })
  }

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
    return (
      <div>
        <FieldAndInput
          handleNameChange={ handleChange }
          autocomplete={ this.user_autocomplete.bind(this) }
          suggestions={ this.state.user_suggestions }
          SuggestionComponent={ PersonRow }
          handleChoice={ this.chooseUser.bind(this) }
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

