import React, { Component } from 'react'
import { Link } from 'react-router'
import { dispatch, connect } from 'react-redux'
import { getEmbedsAsync } from '../actions/embeds'

class Embeds extends Component {
  componentWillMount() {
    let { dispatch } = this.props
    dispatch(getEmbedsAsync())
  }

  renderChildren() {
    let { dispatch, embeds } = this.props
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { dispatch, embeds })
    })
  }

  renderLatest() {
    let { embeds, location, embedsList } = this.props
    console.log(this.props)
    if (location.pathname !== '/embeds') return
    return embedsList.map( embedId => {
      let embed = embeds[embedId]
      return (
        <div key={ embedId }>
          <Link to={`/embeds/${embedId}`}>
            Embed: { embed.description }
          </Link>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <Link to="/embeds/new">
          + Create a new embed
        </Link>
        { this.renderLatest() }
        { this.renderChildren() }
      </div>
    )
  }
}

function select(state) {
  let { embeds, embedsList } = state
  return {
    embeds,
    embedsList
  }
}

export default connect(select)(Embeds)
