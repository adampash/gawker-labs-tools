import React, { Component } from 'react'
import { Link } from 'react-router'
import NewLink from './NewLink'
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
    let list = embedsList.map( embedId => {
      let embed = embeds[embedId]
      return (
        <div key={ embedId }>
          <Link to={`/embeds/${embedId}`}>
            { embed.name }
          </Link>
        </div>
      )
    })
    return (
      <div style={ styles.list }>
        <h3>
          Your latest embeds
          <NewLink to="/embeds/new" text="New embed" />
        </h3>
        { list }
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.renderLatest() }
        { this.renderChildren() }
      </div>
    )
  }
}

const styles = {
  list: {
    maxWidth: 500,
    margin: '0 auto',
  },
}

function select(state) {
  let { embeds, embedsList } = state
  return {
    embeds,
    embedsList
  }
}

export default connect(select)(Embeds)
