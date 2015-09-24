import React from 'react'

export default class NewEmbed extends React.Component {
  handleSubmit(e) {
    // let { createEmbed } = this.props
    e.preventDefault()
    // createEmbed()
    console.log('handled!')
  }

  render() {
    return (
      <div style={ styles.container }>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <textarea
            placeholder="Paste the embed code here"
            style={ styles.textarea }
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
