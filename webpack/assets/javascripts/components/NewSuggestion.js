import { Component } from 'react'

export default class NewSuggestion extends Component {
  render() {
    return (
      <div>
        Email <a
          href="mailto:labs@gawker.com"
          target="_blank"
          style={ styles.link }
        >
          labs@gawker.com
        </a>
      </div>
    )
  }
}

const styles = {
  link: {
    color: 'red'
  }
}
