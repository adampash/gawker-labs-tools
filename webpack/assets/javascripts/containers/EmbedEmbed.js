import React from 'react'
import Radium from 'radium'
import Embed from '../components/Embed'
import KinjaResizer from '../components/KinjaResizer'
import FontAwesome from 'react-fontawesome'
import { getEmbedAsync } from '../actions/embeds'
import { connect } from 'react-redux'

@Radium
class EmbedEmbed extends React.Component {
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

  renderEmbed() {
    // let { embeds, routeParams } = this.props
    // let { embedId } = routeParams
    // let embed = embeds[embedId]
    return (
      <Embed link={ this.renderLink() } />
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
    margin: 0,
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

function select(state) {
  let { embeds } = state
  return {
    embeds
  }
}

export default connect(select)(EmbedEmbed)

