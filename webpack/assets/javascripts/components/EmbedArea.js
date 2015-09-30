import React from 'react'
import Radium from 'radium'
import CopyToClipboard from 'react-copy-to-clipboard'
import FontAwesome from 'react-fontawesome'

@Radium
export default class EmbedArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      copied: false
    }
  }

  renderIframe() {
    let { link } = this.props
    return `<iframe src="${link}" class="custom" width="100%" height="325"></iframe>`
  }

  render() {
    let { copied } = this.state
    return (
      <div>
        <textarea
          value={ this.renderIframe() }
          readOnly={ true }
          style={ styles.textarea }
          onClick={ (e) => { e.target.select() }}
        >
        </textarea>
        <CopyToClipboard text={ this.renderIframe() }
          onCopy={() => this.setState({copied: true})}>
          <FontAwesome name="copy" /> Copy embed code to clipboard
        </CopyToClipboard>&nbsp;
        { copied && "Copied!" }
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
  },
  iframe: {
    outline: 'none',
    border: 'none',
  }
}

