import React from 'react'
import EmbedPreview from './EmbedPreview'
import { createEmbed } from '../actions/embeds'

export default class NewEmbed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit(e) {
    let { dispatch } = this.props
    let { code } = this.state
    e.preventDefault()
    dispatch(createEmbed({code}))
  }

  handleChange(e) {
    this.setState({
      code: e.target.value
    })
  }

  render() {
    return (
      <div style={ styles.container }>
        <form onSubmit={ this.handleSubmit.bind(this) }>
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
    maxWidth: 636,
    width: '100%',
    margin: '20px auto',
  },
  textarea: {
    resize: 'none',
    width: '100%',
    height: 80,
    padding: 10,
    outline: 'none',
  }
}
