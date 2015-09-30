import React from 'react'
import Radium from 'radium'
import EmbedPreview from './EmbedPreview'
import { createEmbed } from '../actions/embeds'

@Radium
export default class NewEmbed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit(e) {
    let { dispatch, history } = this.props
    let { code, name } = this.state
    e.preventDefault()
    dispatch(createEmbed({ code, name}, history))
  }

  handleChange(e) {
    this.setState({
      code: e.target.value
    })
  }

  handleNameChange(e) {
    let { value } = e.target
    this.setState({
      name: value
    })
  }

  render() {
    return (
      <div style={ styles.container }>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <input type="text" placeholder="Embed name"
            onChange={ this.handleNameChange.bind(this) }
            style={ styles.input }
          />
          <textarea
            placeholder="Paste the embed code here"
            style={ styles.textarea }
            onChange={ this.handleChange.bind(this) }
          />
          <button type="submit">Create embed</button>
        </form>
      </div>
    )
  }
}

const styles = {
  container: {
    maxWidth: 400,
    width: '100%',
    margin: '20px auto',
  },
  input: {
    fontSize: 16,
    width: '100%',
    padding: 5,
    marginBottom: 20,
    outline: 'none'
  },
  textarea: {
    resize: 'none',
    width: '100%',
    height: 80,
    padding: 10,
    outline: 'none',
  }
}
