import React from 'react'

export default class EmbedPreview extends React.Component {
  render() {
    let { embedId } = this.props
    return (
      <div style={ styles.container }>
        <iframe src={ `/api/embeds/${embedId}` } />
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

