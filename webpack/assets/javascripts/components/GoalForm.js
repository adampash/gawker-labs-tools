import Network from '../Network'
import { Component } from 'react'
import Radium from 'radium'
import FieldAndInput from './FieldAndInput'
import PersonRow from './PersonRow'
import TitleRow from './TitleRow'

@Radium
export default class GoalForm extends Component {
  componentWillMount() {
  }

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

  title_autocomplete(query) {
    let data = {
      query,
    }
    Network.post("titles/autocomplete", data)
      .then(data => {
        return data.json()
      })
      .then(title_suggestions => {
        // title_suggestions.push('')
        this.setState({
          title_suggestions
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

  chooseTitle(title) {
    this.setState({
      title_suggestions: []
    })
    this.props.handleChange({
      target: { name: 'title_name', value: title.name },
      title
    })
  }

  render() {
    let {
      handleChange,
      prevGoal,
      goal={},
      type,
    } = this.props
    let {
      name,
      title_name,
      goals,
      other_goals,
      person = {},
      siteId,
      last_q_evaluation,
      quarterId,
      job={},
    } = goal
    title_name = title_name || job.name
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
          disabled={ type == 'edit' ? true : false }
        />
        <FieldAndInput
          handleNameChange={ handleChange }
          autocomplete={ this.title_autocomplete.bind(this) }
          suggestions={ this.state.title_suggestions }
          SuggestionComponent={ TitleRow }
          handleChoice={ this.chooseTitle.bind(this) }
          name="title_name"
          title="Title"
          placeholder="Is this a writer, senior writer, editor, etc."
          initialValue={ title_name }
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
          name="other_goals"
          title="Other goals"
          placeholder="Anything else you'd like to see from this person?"
          type="textarea"
          initialValue={ other_goals }
        />
        { prevGoal &&
          <div>
            <div style={ styles.prevGoal }>
              <h4 style={ styles.h4 }>Previous quarter</h4>
              <b>Main goals:</b> { prevGoal.goals }
              <br />
              <b>Other goals:</b> { prevGoal.other_goals }
            </div>
            <FieldAndInput
              handleNameChange={ handleChange }
              name="last_q_evaluation"
              title="Evaluation of previous quarter's goals:"
              placeholder="Were last quarter's goals met?"
              type="textarea"
              initialValue={ last_q_evaluation }
            />
          </div>
        }
      </div>
    )
  }
}

const styles = {
  prevGoal: {
    padding: '10px 0',
  },
  h4: {
    margin: 0,
    padding: 0,
  },
}
