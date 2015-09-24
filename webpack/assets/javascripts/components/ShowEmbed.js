import React from 'react'

export default class ShowEmbed extends React.Component {
  render() {
    console.log(this.props)
    let { embed, router } = this.props
    return (
      <div>
        SHOW THIS EMBED
      </div>
    )
  }
}
