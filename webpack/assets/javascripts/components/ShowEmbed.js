import React from 'react'
import Radium from 'radium'
import { getEmbedAsync } from '../actions/embeds'

@Radium
export default class ShowEmbed extends React.Component {
  componentWillMount() {
    let { routeParams, dispatch } = this.props
    let { embedId } = routeParams

    dispatch(getEmbedAsync(embedId))
  }

  renderLink() {
    let { routeParams } = this.props
    let { embedId } = routeParams
    return `${window.location.origin}/api/embeds/${embedId}`
  }

  renderIframe() {
    return `<iframe src="${this.renderLink()}" class="custom" width="100%" ></iframe>`
  }

  renderEmbed() {
    let { embeds, routeParams } = this.props
    let { embedId } = routeParams
    let embed = embeds[embedId]
    return (
      <div style={ styles.container }>
        <textarea
          value={ this.renderIframe() }
          style={ styles.textarea }
        >
        </textarea>
        <a href={`/api/embeds/${embedId}`} target="_blank">
          Preview
        </a>
        <iframe
          style={ styles.iframe }
          src={ this.renderLink() }
          width="636"
          height="500"
        />
      </div>
    )
  }

  render() {
    let { embeds, routeParams } = this.props
    let { embedId } = routeParams
    if (embeds[embedId]) {
      return this.renderEmbed()
    }
    else {
      return (
        <div>
          Loading...
        </div>
      )
    }
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
  },
  iframe: {
    outline: 'none',
    border: 'none',
  }
}
